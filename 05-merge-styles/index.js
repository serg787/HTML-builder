const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'));
let data = '';

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  files.forEach(el => {
    if (path.extname(el) === '.css') {
      const input = fs.createReadStream(path.join(__dirname, 'styles', el));
      input.on('data', chunk => output.write(data += chunk));
      input.on('error', error => console.log('Error', error.message));
    }
  });
});
