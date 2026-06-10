// Minimal static server for the MaxLife staging preview.
// Railway-ready: binds 0.0.0.0 so the load balancer can reach it.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const ROOT = __dirname;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.json': 'application/json',
};

http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p === '/') p = '/index.html';
  // Directory-like requests (e.g. /brand, /brand/) → /brand/index.html
  if (p.endsWith('/')) p = p + 'index.html';
  let file = path.join(ROOT, p);
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('forbidden'); }
  fs.stat(file, (statErr, stats) => {
    if (!statErr && stats.isDirectory()) {
      file = path.join(file, 'index.html');
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        fs.readFile(file + '.html', (e2, d2) => {
          if (e2) { res.writeHead(404); return res.end('not found'); }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(d2);
        });
        return;
      }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
      res.end(data);
    });
  });
}).listen(PORT, '0.0.0.0', () => console.log('MaxLife staging preview on 0.0.0.0:' + PORT));
