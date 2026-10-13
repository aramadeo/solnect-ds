// theme.js → theme.css (Tailwind 없이 쓰거나 Tailwind v4 @theme 와 함께 쓸 때)
const fs = require('fs');
const path = require('path');
const { toCss } = require('../theme');

const out = path.join(__dirname, '..', 'theme.css');
fs.writeFileSync(out, toCss());
console.log(`wrote ${path.relative(process.cwd(), out)}`);
