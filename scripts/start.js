const { spawn, execSync } = require('child_process');
const { readdirSync } = require('fs');
const { cp } = require('shelljs');

const days = readdirSync('./src');
const day = `day${process.argv[2] ?? days.length - 1}`;

const dayNumber = Number(day.slice(3));

if (!days.includes(day)) {
  console.log(`Creating file structure for ${day}...`);
  cp('-r', 'src/template', `src/${day}`);

  execSync(
    `aoc download --year 2022 --day ${dayNumber} --overwrite \
      --input-file=src/${day}/input.txt --puzzle-file=src/${day}/example.txt -q`
  );
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
