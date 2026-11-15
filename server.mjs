import http from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { access } from 'node:fs/promises';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const PORT = process.env.PORT || 4321;
const ROOT = join(__dirname);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

async function serve(req, res) {
  let url = new URL(req.url, 'http://localhost');
  let path = decodeURIComponent(url.pathname);

  if (path === '/') path = '/financing_calculator.html';
  const filePath = normalize(join(ROOT, path));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  try {
    await access(filePath);
  } catch {
    res.writeHead(404).end('Not found');
    return;
  }

  const ext = extname(filePath).toLowerCase();
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
  });

  let stream;
  try {
    stream = await readFile(filePath);
    res.end(stream);
  } catch (err) {
    res.end(`Error reading file: ${err.message}`);
  }
}

const server = http.createServer(serve);

server.listen(PORT, () => {
  console.log(`Financing Calculator dev server running at http://localhost:${PORT}`);
});
