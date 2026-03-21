/**
 * Lightweight static file server for UI test harnesses.
 * 
 * - Serves harnesses/*.html on /harnesses/
 * - Proxies /media/* to the real extension media folder
 * - Zero external dependencies
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4400;
const HARNESS_DIR = path.join(__dirname, 'harnesses');
const MEDIA_DIR = path.resolve(__dirname, '..', 'local-mind', 'localmind', 'packages', 'extension', 'media');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
};

function serve(res, filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`Not found: ${filePath}`);
            return;
        }
        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-cache',
        });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;

    // Serve harness files
    if (pathname.startsWith('/harnesses/')) {
        const file = path.join(HARNESS_DIR, pathname.replace('/harnesses/', ''));
        return serve(res, file);
    }

    // Proxy media files from the real extension
    if (pathname.startsWith('/media/')) {
        const file = path.join(MEDIA_DIR, pathname.replace('/media/', ''));
        return serve(res, file);
    }

    // Serve fixtures.js
    if (pathname === '/fixtures.js') {
        return serve(res, path.join(__dirname, 'fixtures.js'));
    }

    // Root → redirect to dashboard harness
    if (pathname === '/') {
        res.writeHead(302, { Location: '/harnesses/dashboard.html' });
        return res.end();
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
});

// Export for programmatic use (tests start/stop the server)
let serverInstance = null;
module.exports = {
    start() {
        return new Promise((resolve) => {
            serverInstance = server.listen(PORT, () => {
                console.log(`[localmind-ui-test] Serving on http://localhost:${PORT}`);
                resolve(serverInstance);
            });
        });
    },
    stop() {
        return new Promise((resolve) => {
            if (serverInstance) {
                serverInstance.close(resolve);
            } else {
                resolve();
            }
        });
    },
    PORT,
};

// If run directly: start and keep running
if (require.main === module) {
    module.exports.start();
}
