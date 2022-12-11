import { readExample, readInput, test } from '../utils/index';

const prepareInput = (rawInput: string) => rawInput;

const preparedInput = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input) => {
  return;
};

const goB = (input) => {
  return;
};

/* Tests */

const exampleA = goA(example);
const exampleB = goB(example);

console.log('Example part 1:', exampleA);
console.log('Example part 2:', exampleB);

/* Results */

console.time('Time');
const resultA = goA(preparedInput);
const resultB = goB(preparedInput);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
