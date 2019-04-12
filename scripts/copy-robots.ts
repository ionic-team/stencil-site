const fs = require('fs');
const path = require('path');

const wwwRobots = path.join(__dirname, '..', 'www', 'robots.txt');

if (process.argv.includes('--next')) {
  console.log('copy next to', wwwRobots);
  fs.writeFileSync(wwwRobots,
`
User-agent: *
Disallow: /
`);

} else {
  console.log('copy next to', wwwRobots);
  fs.writeFileSync(wwwRobots,
`
User-agent: *
Disallow:
`);
}
