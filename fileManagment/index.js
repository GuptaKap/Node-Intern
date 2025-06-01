const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const action = query.action;
    const filename = query.filename;
    const content = query.content || '';

    const filePath = path.join(__dirname, 'files', filename || '');

    
    if (!fs.existsSync(path.join(__dirname, 'files'))) {
        fs.mkdirSync(path.join(__dirname, 'files'));
    }

    if (!filename) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Error: filename query parameter is required.');
    }

    //http://localhost:3000/?action=create&filename=test.txt&content=Hello%20World
    if (action === 'create') {
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                res.writeHead(500);
                return res.end('Failed to create file');
            }
            res.writeHead(200);
            res.end(`File "${filename}" created successfully.`);
        });

    } //http://localhost:3000/?action=read&filename=test.txt
    else if (action === 'read') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('File not found');
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });

    } //http://localhost:3000/?action=delete&filename=test.txt
    else if (action === 'delete') {
        fs.unlink(filePath, (err) => {
            if (err) {
                res.writeHead(404);
                return res.end('File not found or already deleted');
            }
            res.writeHead(200);
            res.end(`File "${filename}" deleted successfully.`);
        });

    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid action. Use ?action=create|read|delete');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
