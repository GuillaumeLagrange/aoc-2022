/* eslint-disable max-depth */
import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = false;

type Sensor = {
  sensorX: number;
  sensorY: number;
  beaconX: number;
  beaconY: number;
  range: number;
};

const prepareInput = (rawInput: string): Sensor[] => {
  return rawInput
    .trim()
    .split('\n')
    .map((line) => {
      const splitLine = line
        .split(':')
        .flatMap((entry) => entry.split(',').map((a) => a.split('=')));

      const sensorX = Number(splitLine[0][1]);
      const sensorY = Number(splitLine[1][1]);
      const beaconX = Number(splitLine[2][1]);
      const beaconY = Number(splitLine[3][1]);

      return {
        beaconX,
        beaconY,
        sensorX,
        sensorY,
        range: Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY),
      };
    });
};

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInput(readExample());
const goA = (input: Sensor[], y: number) => {
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < input.length; i++) {
    const { range, sensorX, sensorY } = input[i];

    if (Math.abs(sensorY - y) > range) {
      continue;
    }

    const currentMinX = sensorX - (range - Math.abs(sensorY - y));
    const currentMaxX = sensorX + (range - Math.abs(sensorY - y));
    minX = Math.min(minX, currentMinX);
    maxX = Math.max(maxX, currentMaxX);
  }

  let count = 0;
  for (let x = minX; x <= maxX; x++) {
    for (let i = 0; i < input.length; i++) {
      const { sensorY, sensorX, beaconX, beaconY, range } = input[i];

      if (x === beaconX && y === beaconY) {
        break;
      }

      if (Math.abs(sensorX - x) + Math.abs(sensorY - y) <= range) {
        count += 1;
        break;
      }
    }
  }

  return count;
};

const goB = (input: Sensor[], max: number) => {
  let x = 0;
  let y = 0;

  while (true) {
    if (x > max) {
      x = 0;
      y += 1;
    }

    let found = true;
    for (let i = 0; i < input.length; i++) {
      const { sensorY, sensorX, range } = input[i];

      const rowRange = range - Math.abs(sensorY - y);
      if (Math.abs(sensorX - x) <= rowRange) {
        x = sensorX + rowRange + 1;
        found = false;
        break;
      }
    }

    if (found) {
      return x * 4000000 + y;
    }
  }
  throw new Error();
};

/* Tests */

const exampleA = goA(preparedExampleA, 10);
const exampleB = goB(preparedExampleB, 20);

console.log('Example part 1:', exampleA);
console.log('Example part 2:', exampleB);

/* Results */

if (!ONLY_EXAMPLES) {
  const preparedInputA = prepareInput(readInput());
  const preparedInputB = prepareInput(readInput());

  const resultA = goA(preparedInputA, 2000000);
  console.time('Time');
  const resultB = goB(preparedInputB, 4000000);
  console.timeEnd('Time');

  console.log('Solution to part 1:', resultA);
  console.log('Solution to part 2:', resultB);
}
