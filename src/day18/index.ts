/* eslint-disable max-depth */
import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = false;

type Cube = {
  x: number;
  y: number;
  z: number;
};

const prepareInput = (rawInput: string): Cube[] =>
  rawInput
    .trim()
    .split('\n')
    .map((line) => {
      const [x, y, z] = line.split(',').map(Number);

      return { x, y, z };
    });

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInput(readExample());
const goA = (input: Cube[]) => {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    let countX1 = 1;
    let countX2 = 1;
    let countY1 = 1;
    let countY2 = 1;
    let countZ1 = 1;
    let countZ2 = 1;

    for (let j = 0; j < input.length; j++) {
      if (i === j) {
        continue;
      }
      const { x: x1, y: y1, z: z1 } = input[i];
      const { x: x2, y: y2, z: z2 } = input[j];

      if (x1 === x2 && y1 === y2) {
        if (z2 === z1 + 1) {
          countZ1 = 0;
        }

        if (z2 === z1 - 1) {
          countZ2 = 0;
        }
      }
      if (z1 === z2 && y1 === y2) {
        if (x2 === x1 + 1) {
          countX1 = 0;
        }

        if (x2 === x1 - 1) {
          countX2 = 0;
        }
      }
      if (x1 === x2 && z1 === z2) {
        if (y2 === y1 + 1) {
          countY1 = 0;
        }

        if (y2 === y1 - 1) {
          countY2 = 0;
        }
      }
    }

    count += countX1 + countX2 + countY1 + countY2 + countZ1 + countZ2;
  }

  return count;
};

const goB = (input) => {
  return;
};

/* Tests */

const exampleA = goA(preparedExampleA);
const exampleB = goB(preparedExampleB);

console.log('Example part 1:', exampleA);
console.log('Example part 2:', exampleB);

/* Results */

if (!ONLY_EXAMPLES) {
  const preparedInputA = prepareInput(readInput());
  const preparedInputB = prepareInput(readInput());

  console.time('Time');
  const resultA = goA(preparedInputA);
  const resultB = goB(preparedInputB);
  console.timeEnd('Time');

  console.log('Solution to part 1:', resultA);
  console.log('Solution to part 2:', resultB);
}
