const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'project-dist/style.css'));
let data = '';


function callback(err) {
  if (err) throw err;
}

//create project-dist
fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, callback);
fs.appendFile(path.join(__dirname, 'project-dist/index.html'),'',callback);

//create style.css
fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  files.forEach(el => {
    if (path.extname(el) === '.css') {
      const input = fs.createReadStream(path.join(__dirname, 'styles', el));
      input.on('data', chunk => output.write(data += chunk));
      input.on('error', error => console.log('Error', error.message));
    }
  });
});

//copy assets
fs.mkdir(path.join(__dirname, 'project-dist/assets'), {recursive: true}, callback);
fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
  files.forEach(elDir => {
    fs.mkdir(path.join(__dirname, `project-dist/assets/${elDir}`), {recursive: true}, callback);
    fs.readdir(path.join(__dirname, `assets/${elDir}`), (err, files) => {
      files.forEach(elFile => {
        fs.appendFile(path.join(__dirname, `project-dist/assets/${elDir}/${elFile}`),'',(err) => {if (err) throw err;});
        fs.copyFile(path.join(__dirname, `assets/${elDir}`, `${elFile}`), path.join(__dirname, `project-dist/assets/${elDir}`, `${elFile}`), callback);
      });
    });
  });
});

//copy template.html with components
fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, dataTemplate) => {
  callback();
  let template = dataTemplate;
  fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, dataDir) => {
    dataDir.forEach(file => {
      if (file.isFile() && path.parse(file.name).ext === '.html') {
        let nameHtml = path.parse(file.name).name;
        fs.readFile(path.join(__dirname, `components/${file.name}`), 'utf-8', (err, dataFile) => {
          callback();
          template = template.replace(`{{${nameHtml}}}`, `${dataFile}`);
          const stream = fs.createWriteStream(path.join(__dirname, 'project-dist/index.html'));
          stream.write(template);
        });
      }
    });
  });
});
