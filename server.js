const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const { URL } = require('url');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 8080);
const APPS_SCRIPT_ENDPOINT = process.env.T4L_APPS_SCRIPT_ENDPOINT ||
  'https://script.google.com/macros/s/AKfycbxPfe_Wyb3SVJAYMHFgTAQ5qCO4qsDLU1q9lCylr6nAeWE4nJt1ZEV1SRgja3gcnDHJAg/exec';
const MAX_BODY = 100 * 1024;

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
}

function normalizeAppsScriptResponse(raw) {
  let direct;
  try { direct = JSON.parse(raw); } catch (_) {}
  if (direct && direct.ok) return {
    ok: true,
    status: 'accepted',
    requestId: String(direct.requestId || ''),
    message: String(direct.message || 'Request accepted by Tires 4 Less.')
  };

  // Current Apps Script deployment returns an HTML wrapper with escaped
  // postMessage JSON. Decode the relevant escaped characters server-side.
  const decoded = raw
    .replace(/\\+x22/gi, '"')
    .replace(/\\+x7b/gi, '{')
    .replace(/\\+x7d/gi, '}')
    .replace(/\\+x3a/gi, ':')
    .replace(/\\+x3c/gi, '<')
    .replace(/\\+x3e/gi, '>');

  // The deployed Apps Script web app wraps its response in an HTML shell and
  // sends the authoritative status through window.parent.postMessage(...).
  // Parse that payload first so a successful email/Sheet write is not shown as
  // a client-side failure merely because the outer response is HTML.
  const messageMatch = decoded.match(/postMessage\(\s*(\{[\s\S]*?\})\s*,\s*["']\*["']\s*\)/i);
  if (messageMatch) {
    try {
      const message = JSON.parse(messageMatch[1]);
      if (message && message.ok === true) return {
        ok: true,
        status: 'accepted',
        requestId: String(message.requestId || ''),
        message: String(message.message || 'Request accepted by Tires 4 Less.')
      };
      if (message && message.ok === false) return {
        ok: false,
        status: 'rejected',
        message: String(message.message || 'The request service rejected the submission.')
      };
    } catch (_) {}
  }
  const ok = /["']ok["']\s*:\s*true/i.test(decoded);
  const match = decoded.match(/["']requestId["']\s*:\s*["']([^"']+)["']/i);
  if (ok) return {
    ok: true,
    status: 'accepted',
    requestId: match ? match[1] : '',
    message: 'Request accepted by Tires 4 Less.'
  };
  return {
    ok: false,
    status: 'unknown',
    message: 'The request service did not return a confirmed acceptance.'
  };
}

function forwardToAppsScript(body, callback) {
  const target = new URL(APPS_SCRIPT_ENDPOINT);
  const transport = target.protocol === 'https:' ? https : http;
  const request = transport.request(target, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Length': Buffer.byteLength(body),
      'User-Agent': 'Tires4LessWebsiteNodeRelay/1.0'
    },
    timeout: 75000
  }, upstream => {
    const chunks = [];
    upstream.on('data', chunk => chunks.push(chunk));
    upstream.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8');
      const result = normalizeAppsScriptResponse(raw);
      if (result.ok && upstream.statusCode >= 200 && upstream.statusCode < 400) {
        callback(null, 200, result);
      } else if (upstream.statusCode >= 400) {
        callback(null, 502, { ok: false, status: 'rejected', message: 'The request service rejected the submission.' });
      } else {
        callback(null, 502, result);
      }
    });
  });
  request.on('timeout', () => request.destroy(new Error('upstream timeout')));
  request.on('error', error => callback(error));
  request.write(body);
  request.end();
}

function handleApi(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { ok: false, status: 'failed', message: 'POST requests only.' });
  }
  let received = 0;
  const chunks = [];
  req.on('data', chunk => {
    received += chunk.length;
    if (received > MAX_BODY) {
      req.destroy();
      return;
    }
    chunks.push(chunk);
  });
  req.on('end', () => {
    const rawBody = Buffer.concat(chunks).toString('utf8');
    const fields = querystring.parse(rawBody);
    if (fields.website) return sendJson(res, 400, { ok: false, status: 'rejected', message: 'Request rejected.' });
    if (!String(fields.name || '').trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(fields.email || ''))) {
      return sendJson(res, 422, { ok: false, status: 'failed', message: 'Please provide a valid name and email address.' });
    }
    fields._relay = 't4l-same-origin-node-relay-v1';
    fields._relayReceivedAt = new Date().toISOString();
    const body = querystring.stringify(fields);
    forwardToAppsScript(body, (error, status, result) => {
      if (error) return sendJson(res, 504, { ok: false, status: 'unknown', message: 'We could not verify the request service response.' });
      sendJson(res, status, result);
    });
  });
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.pdf': 'application/pdf' };
function serveStatic(req, res) {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const requested = pathname === '/' ? '/index.html' : pathname;
  const file = path.resolve(ROOT, `.${requested}`);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return sendJson(res, 404, { ok: false, status: 'not-found', message: 'Not found.' });
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}

http.createServer((req, res) => {
  if (req.url.split('?')[0] === '/api/request') return handleApi(req, res);
  serveStatic(req, res);
}).listen(PORT, () => console.log(`Tires 4 Less website running at http://localhost:${PORT}`));
