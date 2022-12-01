const { spawn, execSync } = require('child_process');
const { readdirSync } = require('fs');
const { cp } = require('shelljs');

const days = readdirSync('./src');
const day = `day${process.argv[2] ?? days.length - 1}`;

if (!days.includes(day)) {
  console.log(`Creating file structure for ${day}...`);
  cp('-r', 'src/template', `src/${day}`);
}

spawn(
  /^win/.test(process.platform) ? 'nodemon.cmd' : 'nodemon',
  [
    '-x',
    'ts-node',
    `src/${day}/index.ts`,
    '--watch',
    `src/${day}/index.ts`,
    '--watch',
    `src/${day}/input.txt`,
  ],
  {
    stdio: 'inherit',
  },
);
