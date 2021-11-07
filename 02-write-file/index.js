const readline = require('readline');
const fs = require('fs');
const path = require('path');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Введите фразу:\n',
});
fs.appendFile(path.join(__dirname, 'myNotes.txt'),'',(err) => {
  if (err) throw err;
});
rl.prompt();
rl.on('line', (line) => {
  fs.appendFile(
    path.join(__dirname, 'myNotes.txt'),
    `${line.trim()}\n`,
    err => {
      if (err) throw err;
    }
  );
  if (line.trim() === 'exit') {
    console.log('Процесс завершен, удачного дня!');
    process.exit(0);
  }
  rl.prompt();
}).on('close', () => {
  console.log('Процесс завершен, удачного дня!');
  process.exit(0);
});
