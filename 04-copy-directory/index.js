const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {if (err) throw err;});
fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  files.forEach(el => {
    fs.copyFile(path.join(__dirname, 'files', `${el}`), path.join(__dirname, 'files-copy', `${el}`), (err) => {if (err) throw err;});
  });
});
