import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = false;

const getPriority = (str: string): number => {
  if (str.toLowerCase() === str) {
    return str.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  }

  return str.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
};

const prepareInput = (rawInput: string): string[] =>
  rawInput.trim().split('\n');

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInput(readExample());
const preparedInputA = prepareInput(readInput());
const preparedInputB = prepareInput(readInput());

const goA = (input: string[]) => {
  return input.reduce((acc, line) => {
    for (let i = 0; i < line.length; i++) {
      if (line.slice(line.length / 2).includes(line[i])) {
        return acc + getPriority(line[i]);
      }
    }

    return acc;
  }, 0);
};

const goB = (lines: string[]) => {
  let score = 0;
  for (let i = 0; i < lines.length / 3; i++) {
    for (let j = 0; j < lines[3 * i].length; j++) {
      const char = lines[3 * i][j];
      if (lines[3 * i + 1].includes(char) && lines[3 * i + 2].includes(char)) {
        score += getPriority(char);
        break;
      }
    }
  }

  return score;
};

/* Tests */

const exampleA = goA(preparedExampleA);
const exampleB = goB(preparedExampleB);

console.log('Example part 1:', exampleA);
console.log('Example part 2:', exampleB);

/* Results */

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (!ONLY_EXAMPLES) {
  console.time('Time');
  const resultA = goA(preparedInputA);
  const resultB = goB(preparedInputB);
  console.timeEnd('Time');

  console.log('Solution to part 1:', resultA);
  console.log('Solution to part 2:', resultB);
}
