const fs = require('fs');
const path = require('path');
const htmlPath = path.join(__dirname, '..', 'src', 'content', 'sections.html');
const tsPath = path.join(__dirname, '..', 'src', 'content', 'sections.ts');
const html = fs.readFileSync(htmlPath, 'utf8');
const escaped = JSON.stringify(html);
fs.writeFileSync(tsPath, `export const sectionsHTML = ${escaped};\n`, 'utf8');
console.log('sections.ts generated,', html.length, 'chars');
