const fs = require('fs');
const file = 'c:/Users/User ACER/Desktop/agency/Arjun Buildtech/frontend/src/data/blogs.js';
let content = fs.readFileSync(file, 'utf8');

// The file has "content: \`" instead of "content: `"
// Because it was escaped in my earlier tool call.
content = content.replace(/\\`/g, '`');

fs.writeFileSync(file, content);
console.log('Fixed syntax in blogs.js');
