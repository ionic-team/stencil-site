const fs = require('fs');
const path = require('path');

const wwwRobots = path.join(__dirname, '..', 'www', 'robots.txt');

if (process.argv.includes('--next')) {
  fs.writeFileSync(wwwRobots,
`
User-agent: *
Disallow: /
`);

} else {
  fs.writeFileSync(wwwRobots,
`
User-agent: *
Disallow:
`);
}
