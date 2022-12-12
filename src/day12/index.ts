/* eslint-disable complexity */
/* eslint-disable max-depth */
import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = false;

type Location = {
  i: number;
  j: number;
};

type PathToVisit = {
  steps: number;
  location: Location;
};

type Input = number[][];

const prepareInput = (rawInput: string): Input =>
  rawInput
    .trim()
    .split('\n')
    .map((line) =>
      line.split('').map((char) => {
        if (char === 'S') {
          return 'a'.charCodeAt(0) - 1;
        }

        if (char === 'E') {
          return 'z'.charCodeAt(0) + 1;
        }

        return char.charCodeAt(0);
      }),
    );

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInput(readExample());
const preparedInputA = prepareInput(readInput());
const preparedInputB = prepareInput(readInput());

const isReachable = (from: number, to: number) => {
  return from + 1 >= to;
};

const getStartingPos = (input: Input): Location => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === 'a'.charCodeAt(0) - 1) {
        return {
          i,
          j,
        };
      }
    }
  }

  throw new Error();
};

const isVisited = ({ i, j }: Location, visited: Location[]): boolean => {
  return visited.some((location) => location.i === i && location.j === j);
};

const getPathLength = (startingPos: Location, input: Input): number => {
  const visited: Location[] = [];

  const paths: PathToVisit[] = [{ steps: 0, location: startingPos }];

  while (paths.length > 0) {
    const { steps, location } = paths.pop() as PathToVisit;

    const { i, j } = location;

    if (input[i][j] === 'z'.charCodeAt(0) + 1) {
      return steps;
    }

    if (isVisited(location, visited)) {
      continue;
    }

    visited.push(location);

    for (let k = -1; k <= 1; k++) {
      for (let l = -1; l <= 1; l++) {
        const testLocation = { i: i + k, j: j + l };
        const { i: testI, j: testJ } = testLocation;

        if (
          testI < 0 ||
          testJ < 0 ||
          testI >= input.length ||
          testJ >= input[i].length ||
          (k !== 0 && l !== 0)
        ) {
          continue;
        }

        if (isReachable(input[i][j], input[testI][testJ])) {
          paths.unshift({
            location: testLocation,
            steps: steps + 1,
          });
        }
      }
    }
  }

  return Number.POSITIVE_INFINITY;
};

const goA = (input: Input) => {
  const startingPos = getStartingPos(input);

  return getPathLength(startingPos, input);
};

const getStartingPosB = (input: Input): Location[] => {
  const locations: Location[] = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === 'a'.charCodeAt(0)) {
        locations.push({
          i,
          j,
        });
      }
    }
  }

  return locations;
};

const goB = (input: Input) => {
  const startingPos = getStartingPosB(input);

  return startingPos
    .map((location) => getPathLength(location, input))
    .sort()[0];
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
