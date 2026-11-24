const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const scanHandler = require('./api/scan');

const ROOT = __dirname;
const FILES = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/index.html': ['index.html', 'text/html; charset=utf-8'],
  '/styles.css': ['styles.css', 'text/css; charset=utf-8'],
  '/app.js': ['app.js', 'text/javascript; charset=utf-8'],
};
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self'; font-src 'self'",
};

const server = http.createServer((req, res) => {
  for (const [name, value] of Object.entries(securityHeaders)) res.setHeader(name, value);

  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/api/scan') return scanHandler(req, res);

  const file = FILES[pathname];
  if (!file) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.end('Not found');
  }

  res.setHeader('Content-Type', file[1]);
  res.setHeader('Cache-Control', pathname === '/' ? 'no-store' : 'public, max-age=300');
  fs.createReadStream(path.join(ROOT, file[0]))
    .on('error', () => {
      if (!res.headersSent) res.statusCode = 500;
      res.end('Could not read application file.');
    })
    .pipe(res);
});

const port = Number(process.env.PORT || 3000);
server.listen(port, '127.0.0.1', () => {
  process.stdout.write(`CICLO pilot running at http://127.0.0.1:${port}\n`);
});
