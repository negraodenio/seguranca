# CICLO Security Pilot

A working, dependency-free MVP for verified-scope external posture checks and recovery-readiness planning.

## What works

- Creates a random DNS TXT challenge for one hostname and asks the operator to attest to authorization.
- Requires the challenge before the server performs any active check.
- Checks SPF, DMARC, MX, public IPv4, TLS certificate status, and selected HTTPS response headers.
- Pins the HTTPS request to a verified public IPv4 and only sends a read-only `HEAD /` request on port 443.
- Rejects raw IP addresses, private/reserved IPv4 addresses, URL paths, and unverified hostnames.
- Lets an operator record critical services, RTO/RPO targets, and a restore-test date in the browser.
- Exports the current scan and recovery record as JSON or prints the current view to PDF.

The DNS challenge proves only that the token is currently published on the hostname. DNS is public, so it does not authenticate the person making a request or establish legal ownership. Treat this as a scoped pilot, not production authorization or tenant access control.

## Current limits

This release does not scan internal networks, enumerate subdomains, inspect endpoints, ingest Wazuh telemetry, detect active intrusions, find zero-day vulnerabilities, apply fixes, or restore backups. The recovery page records a plan; it does not execute a restore. It makes no claim that a clean result means an environment is safe.

## Run locally

Requires Node.js 20 or later. No package installation is needed.

```powershell
npm run build
npm run dev
```

Open `http://127.0.0.1:3000`. To run a scan, generate a challenge and publish the exact TXT value at `_ciclo-verify.<your-domain>`. The app does not store scan results on the server; it keeps the current report and recovery plan in that browser's local storage.

## Deploy to Vercel

The app is configured for Vercel's Node.js serverless runtime. Link a Vercel project and deploy with the Vercel CLI. The first production release should use a pilot domain, and the account owner should review deployment logs and function limits.

## Open-source engines considered

Nuclei, Wazuh, and Greenbone are not bundled in this MVP. Add them as isolated, separately licensed services only after the authorized scope, workload isolation, feed/template terms, and commercial license implications have been reviewed.
