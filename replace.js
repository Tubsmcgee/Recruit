const fs = require('fs');

fs.readdirSync('build').forEach(filename => {
  const fn = 'build/' + filename;
  if (fs.lstatSync(fn).isDirectory()) return;
  const file = fs.readFileSync(fn).toString();
  const replaced = file.replace(/\/(static|manifest|favicon|index|precache|service)/g, (full, partial) => partial);
  fs.writeFileSync(fn, replaced);
});
