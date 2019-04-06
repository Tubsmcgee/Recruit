const fs = require('fs');

const file = fs.readFileSync('build/index.html').toString();
const replaced = file.replace(/\/(static|manifest|favicon)/g, (full, partial) => partial);
fs.writeFileSync('build/index.html', replaced);
