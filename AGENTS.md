# CICLO Security Pilot — Project Instructions

## Overview

- `ciclo-security-pilot` (`0.1.0`) is a zero-dependency Node.js (`>=20`) and vanilla HTML/CSS/JS MVP for verified-scope external posture checks (DNS mail policy, TLS certificate, selected HTTPS headers) and browser-local recovery-readiness planning.
- Runs locally via `server.js` (`http://127.0.0.1:3000`, `PORT` env override) and deploys as a Vercel Node.js serverless app (`vercel.json` + `api/scan.js`, `maxDuration: 10`).

## Commands

- `npm run build` — Syntax check across backend and frontend (`node --check server.js && node --check api/scan.js && node --check app.js`).
- `npm run dev` / `npm start` — Starts `server.js` bound to `127.0.0.1:${PORT || 3000}`.
- No npm dependencies, bundler, linter, or automated test runner are installed; keep the project dependency-free unless explicitly requested.

## Architecture & File Map

- `server.js` — Local HTTP server (CommonJS, `node:*` built-ins). Serves only allowlisted static files (`/`, `/index.html`, `/styles.css`, `/app.js`), routes `/api/scan` to `api/scan.js`, and sets security headers on every response.
- `api/scan.js` — `POST /api/scan` handler shared by the local server and Vercel serverless runtime. Enforces a 4096-byte JSON body cap, in-memory per-IP rate limit (5 req/60s), concurrency cap (max 4 active scans), hostname validation (`normalizeDomain`), caller attestation (`authorized === true`), DNS TXT challenge check (`_ciclo-verify.<domain>` matching `^ciclo-[a-f0-9]{32}$`), SPF/DMARC/MX/IPv4 lookups, and a single pinned read-only `HEAD /` HTTPS probe on port 443 (`probeHttps`, 5s timeout) with findings scoring (`scoreFindings`).
- `index.html` — Single-page dark-themed workspace with three tabs (`External exposure`, `Recovery readiness`, `Scope & limits`), `data-i18n` hooks, JSON export, and print/PDF controls.
- `app.js` — Deferred vanilla browser script. Holds bilingual `COPY` (`en`/`pt`, persisted in `localStorage` key `ciclo.language`, default `'en'`), generates DNS challenge tokens (`crypto.getRandomValues`), calls `POST /api/scan`, stores scan and recovery plan locally (`ciclo.scan.v1`, `ciclo.plan.v1`), and renders escaped HTML via `escapeHtml()`.
- `styles.css` — CSS-variable dark theme, responsive breakpoints (`900px`, `700px`, `380px`), and light `@media print` styles.
- `vercel.json` — Vercel v2 configuration (`cleanUrls: true`, `api/scan.js` `maxDuration: 10`, security headers + CSP).
- `README.md` — Operational overview, pilot limits, local/Vercel instructions, and third-party engine licensing boundaries.

## Security & Product Invariants (Must Preserve)

- **Header & CSP parity**: Keep `server.js` (`securityHeaders`) and `vercel.json` (`headers`) in sync, including strict CSP (`script-src 'self'`, `style-src 'self'`, `frame-ancestors 'none'`). Do not add inline `<script>`, inline event handlers, inline `<style>` attributes/tags that violate CSP, or external CDN assets/fonts.
- **SSRF & scope guardrails (`api/scan.js`)**: Never bypass `_ciclo-verify.<domain>` TXT verification or `authorized === true`. Reject raw IPs, URL paths/schemes, private/reserved TLDs (`localhost`, `local`, `test`, `invalid`, `example`), and non-public IPv4 addresses. Keep `probeHttps` restricted to `HEAD /` on port 443 and pinned to a validated public IPv4 via custom `lookup`. (`rejectUnauthorized: false` is intentional solely to inspect expired/untrusted certificates and report `res.socket.authorized`.)
- **XSS safety (`app.js`)**: Always pass dynamic or server-returned strings through `escapeHtml()` before interpolating into `innerHTML`. Only trusted static `COPY` strings may be rendered via `data-i18n` `innerHTML`.
- **Honest pilot claims**: Keep UI copy and docs accurate—DNS TXT does not authenticate callers or prove legal ownership; saving a recovery plan does not execute or prove a restore; a high score does not guarantee security. Do not bundle Nuclei, Wazuh, or Greenbone into this MVP.
- **Bilingual parity**: Update both `COPY.en` and `COPY.pt` in `app.js` (note the `Object.assign` overrides at lines 23–44) and keep English fallback text in `index.html` aligned when changing UI text.

## Known Issues & Pitfalls

- `api/scan.js` (`isPublicIpv4`, lines 70–77): destructures `const [a, b, c] = address.split('.').map(Number);` without `d`, while line 77 checks `d !== 9 && d !== 10` for `192.0.0.x` — this throws a `ReferenceError` if a domain resolves to `192.0.0.x`.
- In-memory rate limiting (`requestsByIp`) and concurrency limiting (`activeScans`) in `api/scan.js` are per-process and do not share state across Vercel serverless instances.
- IPv6-only targets are intentionally skipped in the HTTPS probe (`resolve4` only).

## Verification Expectations

- Run `npm run build` after any JS change.
- Keep `README.md` and the `Scope & limits` panel aligned if capabilities or limits change.
