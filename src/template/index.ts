import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = false;

const prepareInput = (rawInput: string) => rawInput;

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInput(readExample());
const goA = (input) => {
  return;
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
