const fs = require('fs');
const path = require('path');
const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, {withFileTypes: true}, (err, files) => {
  files.forEach(file => {
    if (file.isFile()) {
      fs.stat(path.join(secretFolder, file.name), (err, stats) => {
        if (stats) {
          console.log(`${path.parse(file.name).name} - ${path.extname(file.name).slice(1)} - ${(stats.size / 1024)}kb`);
        } else console.log('Файл не найден');
      });
    }
  });
});
