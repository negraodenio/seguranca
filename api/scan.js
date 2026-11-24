const dns = require('node:dns').promises;
const https = require('node:https');
const { isIP } = require('node:net');
const { domainToASCII } = require('node:url');

const MAX_BODY = 4096;
const REQUEST_TIMEOUT_MS = 5000;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 5;
const requestsByIp = new Map();
let activeScans = 0;

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;

  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (Buffer.byteLength(raw, 'utf8') > MAX_BODY) {
      const error = new Error('Request body is too large.');
      error.statusCode = 413;
      throw error;
    }
  }

  try {
    return JSON.parse(raw || '{}');
  } catch {
    const error = new Error('Send a valid JSON request.');
    error.statusCode = 400;
    throw error;
  }
}

function normalizeDomain(input) {
  if (typeof input !== 'string') throw new Error('Enter a domain name.');
  const raw = input.trim().replace(/\.$/, '');
  if (!raw || raw.includes('://') || /[\s/@:#?\\]/.test(raw)) {
    throw new Error('Enter a hostname only, such as example.com.');
  }

  const ascii = domainToASCII(raw.toLowerCase());
  if (!ascii || ascii.length > 253 || ascii.split('.').length < 2) {
    throw new Error('Enter a valid public domain name.');
  }

  const labels = ascii.split('.');
  if (labels.some((label) => !label || label.length > 63 || !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label))) {
    throw new Error('The domain contains an invalid DNS label.');
  }

  if (['localhost', 'local', 'test', 'invalid', 'example'].includes(labels.at(-1))) {
    throw new Error('Private and example domains cannot be scanned.');
  }
  if (isIP(ascii)) throw new Error('Enter a verified domain, not an IP address.');
  return ascii;
}

function isPublicIpv4(address) {
  if (isIP(address) !== 4) return false;
  const [a, b, c] = address.split('.').map(Number);
  if (a === 0 || a === 10 || a === 127 || a >= 224) return false;
  if (a === 100 && b >= 64 && b <= 127) return false;
  if (a === 169 && b === 254) return false;
  if (a === 172 && b >= 16 && b <= 31) return false;
  if (a === 192 && b === 168) return false;
  // IETF protocol assignments are reserved except for the globally reachable .9 and .10 hosts.
  if (a === 192 && b === 0 && c === 0 && d !== 9 && d !== 10) return false;
  if (a === 192 && b === 0 && c === 2) return false;
  if (a === 192 && b === 88 && c === 99) return false;
  if (a === 198 && (b === 18 || b === 19)) return false;
  if (a === 198 && b === 51 && c === 100) return false;
  if (a === 203 && b === 0 && c === 113) return false;
  return true;
}

async function resolveTxtValues(name) {
  try {
    const records = await dns.resolveTxt(name);
    return records.map((chunks) => chunks.join(''));
  } catch (error) {
    if (['ENODATA', 'ENOTFOUND', 'NXDOMAIN', 'ESERVFAIL'].includes(error.code)) return [];
    throw error;
  }
}

async function resolve4Values(name) {
  try {
    return await dns.resolve4(name);
  } catch (error) {
    if (['ENODATA', 'ENOTFOUND', 'NXDOMAIN'].includes(error.code)) return [];
    throw error;
  }
}

async function resolveMxValues(name) {
  try {
    return await dns.resolveMx(name);
  } catch (error) {
    if (['ENODATA', 'ENOTFOUND', 'NXDOMAIN'].includes(error.code)) return [];
    throw error;
  }
}

function probeHttps(domain, pinnedIp) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: domain,
      servername: domain,
      port: 443,
      method: 'HEAD',
      path: '/',
      agent: false,
      rejectUnauthorized: false,
      headers: { 'User-Agent': 'CicloSecurity/0.1 (authorized-read-only-check)' },
      lookup: (_hostname, options, callback) => {
        if (options && options.all) callback(null, [{ address: pinnedIp, family: 4 }]);
        else callback(null, pinnedIp, 4);
      },
    }, (res) => {
      const cert = res.socket && res.socket.getPeerCertificate ? res.socket.getPeerCertificate() : {};
      const validTo = cert.valid_to ? new Date(cert.valid_to) : null;
      const daysRemaining = validTo && !Number.isNaN(validTo.getTime())
        ? Math.floor((validTo.getTime() - Date.now()) / 86_400_000)
        : null;
      const selectedHeaders = {};
      for (const key of [
        'strict-transport-security',
        'content-security-policy',
        'x-frame-options',
        'x-content-type-options',
        'referrer-policy',
        'location',
      ]) {
        if (res.headers[key]) selectedHeaders[key] = String(res.headers[key]).slice(0, 500);
      }
      res.resume();
      resolve({
        statusCode: res.statusCode || 0,
        headers: selectedHeaders,
        certificate: {
          authorized: Boolean(res.socket && res.socket.authorized),
          validTo: validTo && !Number.isNaN(validTo.getTime()) ? validTo.toISOString() : null,
          daysRemaining,
          subject: cert.subject && cert.subject.CN ? String(cert.subject.CN).slice(0, 200) : null,
        },
      });
    });

    req.setTimeout(REQUEST_TIMEOUT_MS, () => req.destroy(new Error('HTTPS request timed out.')));
    req.once('error', reject);
    req.end();
  });
}

function finding(severity, title, detail, recommendation, evidence = '') {
  return { severity, title, detail, recommendation, evidence };
}

function scoreFindings(findings) {
  const deductions = { critical: 30, high: 18, medium: 10, low: 4, info: 0 };
  return Math.max(0, 100 - findings.reduce((total, item) => total + (deductions[item.severity] || 0), 0));
}

function rateLimit(ip) {
  const now = Date.now();
  const recent = (requestsByIp.get(ip) || []).filter((time) => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return false;
  recent.push(now);
  requestsByIp.set(ip, recent);
  if (requestsByIp.size > 2000) {
    for (const [key, times] of requestsByIp) {
      if (!times.some((time) => now - time < RATE_WINDOW_MS)) requestsByIp.delete(key);
    }
  }
  return true;
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Use POST to start an authorized scan.' });
  }

  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
  if (!rateLimit(ip)) return send(res, 429, { error: 'Scan limit reached. Wait a minute and try again.' });
  if (activeScans >= 4) return send(res, 503, { error: 'Scanner is busy. Try again shortly.' });

  let body;
  try {
    body = await readBody(req);
  } catch (error) {
    return send(res, error.statusCode || 400, { error: error.message });
  }

  let domain;
  try {
    domain = normalizeDomain(body.domain);
  } catch (error) {
    return send(res, 400, { error: error.message });
  }

  if (body.authorized !== true) {
    return send(res, 400, { error: 'Confirm that you own this hostname or are authorized to assess it.' });
  }

  const token = typeof body.token === 'string' ? body.token : '';
  if (!/^ciclo-[a-f0-9]{32}$/.test(token)) {
    return send(res, 400, { error: 'Generate a verification token before scanning.' });
  }

  const verificationName = `_ciclo-verify.${domain}`;
  activeScans += 1;

  try {
    const proofRecords = await resolveTxtValues(verificationName);
    if (!proofRecords.includes(token)) {
      return send(res, 403, {
        error: `The DNS challenge did not match. Publish the exact TXT value at ${verificationName}, wait for DNS to update, then retry.`,
      });
    }

    const [apexTxt, dmarcTxt, mxRecords, addresses] = await Promise.all([
      resolveTxtValues(domain),
      resolveTxtValues(`_dmarc.${domain}`),
      resolveMxValues(domain),
      resolve4Values(domain),
    ]);

    const findings = [];
    const spfRecords = apexTxt.filter((value) => /^v=spf1\b/i.test(value));
    const dmarcRecords = dmarcTxt.filter((value) => /^v=dmarc1\s*;/i.test(value));
    const publicAddresses = [...new Set(addresses)].filter(isPublicIpv4);

    if (spfRecords.length === 0) {
      findings.push(finding('medium', 'SPF record not found', 'The domain has no visible SPF policy in its apex TXT records.', 'Publish an SPF record that lists the legitimate mail senders for this domain.', 'No TXT value beginning with v=spf1 was returned.'));
    } else if (spfRecords.length > 1) {
      findings.push(finding('high', 'Multiple SPF records found', 'More than one SPF record can cause receivers to treat the policy as a permanent error.', 'Merge the approved senders into a single SPF record.', `${spfRecords.length} SPF records found.`));
    } else {
      findings.push(finding('info', 'SPF record found', 'An SPF policy is published for the domain.', 'Review the policy periodically and remove senders that are no longer used.', spfRecords[0]));
    }

    if (dmarcRecords.length === 0) {
      findings.push(finding('high', 'DMARC record not found', 'Receivers do not have a DMARC policy for handling messages that claim to come from this domain.', 'Publish DMARC, start with reporting, then move to quarantine or reject after validating legitimate senders.', 'No DMARC1 record was returned at _dmarc.'));
    } else {
      const policyMatch = dmarcRecords[0].match(/(?:^|;)\s*p\s*=\s*(none|quarantine|reject)\b/i);
      const policy = policyMatch ? policyMatch[1].toLowerCase() : 'unknown';
      if (policy === 'none') {
        findings.push(finding('medium', 'DMARC is in monitoring mode', 'A DMARC record exists, but p=none does not ask receivers to quarantine or reject failed messages.', 'Review aggregate reports and move to quarantine or reject when all legitimate senders pass SPF or DKIM.', dmarcRecords[0]));
      } else if (policy === 'quarantine' || policy === 'reject') {
        findings.push(finding('info', `DMARC policy is ${policy}`, 'The domain asks receivers to enforce a DMARC policy.', 'Keep monitoring reports for legitimate mail failures.', dmarcRecords[0]));
      } else {
        findings.push(finding('medium', 'DMARC policy needs review', 'A DMARC record exists, but a recognizable p= policy was not found.', 'Check the record syntax and publish an intentional policy.', dmarcRecords[0]));
      }
    }

    findings.push(mxRecords.length
      ? finding('info', 'Mail exchanger records found', 'The domain publishes MX records for inbound email.', 'Confirm every approved mail provider is covered by SPF, DKIM, and DMARC.', `${mxRecords.length} MX record(s) returned.`)
      : finding('info', 'No MX records found', 'No MX record was returned for the domain.', 'If this domain sends email, confirm mail routing and authentication records are configured.', 'No MX records returned.'));

    if (publicAddresses.length === 0) {
      findings.push(finding('medium', 'No public IPv4 address available for the web check', 'The domain did not resolve to a public IPv4 address, so the HTTPS check was skipped.', 'Confirm the correct public web hostname is being assessed. IPv6-only targets are not probed in this MVP.', addresses.length ? 'Resolved addresses were not eligible for an external probe.' : 'No A record returned.'));
    } else {
      let web;
      try {
        web = await probeHttps(domain, publicAddresses[0]);
      } catch (error) {
        findings.push(finding('high', 'HTTPS service could not be verified', 'A read-only TLS/HTTP check did not complete successfully.', 'Confirm the public service is intended to be reachable over HTTPS and review its certificate and firewall configuration.', error.message.slice(0, 180)));
      }

      if (web) {
        const cert = web.certificate;
        if (!cert.validTo) {
          findings.push(finding('medium', 'TLS certificate details unavailable', 'The HTTPS service responded, but the scanner could not read a certificate expiry date.', 'Review the certificate chain and renewals from the service owner console.', `HTTP ${web.statusCode}`));
        } else if (cert.daysRemaining < 0) {
          findings.push(finding('critical', 'TLS certificate has expired', 'The public certificate is past its validity date.', 'Renew and deploy the certificate, then verify the complete chain.', `Expired ${Math.abs(cert.daysRemaining)} day(s) ago.`));
        } else if (cert.daysRemaining <= 14) {
          findings.push(finding('high', 'TLS certificate expires soon', `The certificate expires in ${cert.daysRemaining} day(s).`, 'Renew the certificate and verify automatic renewal is working.', cert.validTo));
        } else if (!cert.authorized) {
          findings.push(finding('high', 'TLS certificate validation failed', 'The certificate chain was not trusted by the scanner.', 'Install a valid certificate chain for the public hostname.', cert.subject || 'Certificate chain could not be validated.'));
        } else {
          findings.push(finding('info', 'TLS certificate is currently valid', `The certificate is valid for approximately ${cert.daysRemaining} more day(s).`, 'Keep automatic renewal enabled and monitor certificate expiry.', cert.validTo));
        }

        const headers = web.headers;
        if (!headers['strict-transport-security']) findings.push(finding('medium', 'HSTS header not found', 'The HTTPS response does not advertise HTTP Strict Transport Security.', 'After confirming HTTPS works across the domain, configure an appropriate Strict-Transport-Security header.'));
        if (!headers['content-security-policy']) findings.push(finding('low', 'Content Security Policy not found', 'The response does not include a Content-Security-Policy header.', 'Review the application and deploy a policy that matches its scripts, styles, and frames.'));
        if (!headers['x-content-type-options']) findings.push(finding('low', 'Content type protection header not found', 'The response does not include X-Content-Type-Options.', 'Set X-Content-Type-Options: nosniff where compatible.'));
        if (!headers['x-frame-options'] && !(headers['content-security-policy'] || '').toLowerCase().includes('frame-ancestors')) {
          findings.push(finding('low', 'Clickjacking protection not found', 'Neither X-Frame-Options nor a CSP frame-ancestors directive was detected.', 'Set a frame policy appropriate for the product, usually through Content-Security-Policy frame-ancestors.'));
        }
        if (!headers['referrer-policy']) findings.push(finding('low', 'Referrer policy not found', 'The response does not include a Referrer-Policy header.', 'Choose a policy such as strict-origin-when-cross-origin after checking application needs.'));
        if (headers.location && /^http:\/\//i.test(headers.location)) {
          findings.push(finding('high', 'HTTPS endpoint redirects to HTTP', 'The observed HTTPS response points to an insecure HTTP location.', 'Update the redirect target to HTTPS and verify the complete redirect chain.', headers.location));
        }
      }
    }

    const score = scoreFindings(findings);
    return send(res, 200, {
      domain,
      dnsChallengeMatched: true,
      scannedAt: new Date().toISOString(),
      scope: 'DNS TXT, MX, TLS certificate, and HTTP response headers for one hostname with a matching DNS challenge. Read-only checks only; no exploit attempts or internal endpoint telemetry.',
      publicAddresses,
      score,
      scoreLabel: 'External posture score',
      findings,
      limitations: [
        'The DNS challenge confirms the token is published on this hostname. DNS is public, so this does not authenticate the person calling the scanner or establish legal ownership.',
        'This scan does not identify an attacker as AI-driven or prove that no intrusion is active.',
        'This MVP checks only the verified hostname and selected public configuration; it does not scan subdomains, internal networks, endpoint activity, cloud tenants, or source code.',
        'A clean score is not a guarantee of security. Use the findings as evidence for remediation and broader monitoring.',
      ],
    });
  } catch (error) {
    return send(res, 502, { error: 'The scan could not complete. Check DNS availability and try again.' });
  } finally {
    activeScans = Math.max(0, activeScans - 1);
  }
}

module.exports = handler;
