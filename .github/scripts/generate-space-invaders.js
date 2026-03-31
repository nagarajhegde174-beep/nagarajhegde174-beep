const https = require('https');
const fs = require('fs');

// ✅ Username (change here if needed)
const USERNAME = process.env.GITHUB_USERNAME || 'nagarajhegde174-beep';

// ✅ Token from GitHub Actions
const TOKEN = process.env.GITHUB_TOKEN;

// ✅ Auto current year (IMPORTANT FIX)
const year = new Date().getFullYear();

const FROM = `${year}-01-01T00:00:00Z`;
const TO   = `${year}-12-31T23:59:59Z`;

const query = `query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        weeks {
          contributionDays {
            contributionCount
          }
        }
      }
    }
  }
}`;

// 📡 Fetch contributions
function fetchContributions() {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      query,
      variables: { username: USERNAME, from: FROM, to: TO }
    });

    const req = https.request({
      hostname: 'api.github.com',
      path: '/graphql',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'space-invaders-gen'
      }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const parsed = JSON.parse(data);
        if (parsed.errors) {
          console.error(parsed.errors);
          process.exit(1);
        }
        resolve(parsed);
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// 🎨 Colors
function getColor(n) {
  if (n === 0) return '#1a2332';
  if (n < 2) return '#0d4a2a';
  if (n < 5) return '#1a7a3a';
  if (n < 10) return '#26c050';
  if (n < 20) return '#39e85a';
  return '#57ff7a';
}

// 🧠 Generate SVG
function generateSVG(weeks) {
  const size = 12, gap = 3;
  const step = size + gap;

  const cells = [];

  weeks.forEach((week, x) => {
    week.contributionDays.forEach((day, y) => {
      cells.push({
        x: x * step,
        y: y * step,
        count: day.contributionCount
      });
    });
  });

  return `
<svg width="900" height="150" xmlns="http://www.w3.org/2000/svg">
  ${cells.map(c => `
    <rect x="${c.x}" y="${c.y}" width="${size}" height="${size}"
      fill="${getColor(c.count)}" rx="2" />
  `).join('')}
</svg>`;
}

// 🚀 Main
async function main() {
  console.log(`Fetching ${year} contributions for ${USERNAME}`);

  const result = await fetchContributions();
  const weeks = result.data.user.contributionsCollection.contributionCalendar.weeks;

  const svg = generateSVG(weeks);

  fs.mkdirSync('dist', { recursive: true });
  fs.writeFileSync('dist/space-invaders.svg', svg);

  console.log("SVG generated!");
}

main().catch(console.error);
