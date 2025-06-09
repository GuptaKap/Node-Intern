const fs = require('fs').promises;

function readFilePromise() {
    fs.readFile('example.txt', 'utf8')
        .then(data => {
            console.log('File content:', data);
        })
        .catch(err => {
            console.error('Error reading file:', err);
        });
}
