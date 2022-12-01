import { test, readInput, readExample } from '../utils/index';

const prepareInput = (rawInput: string) => 
  rawInput.trim().split('\n\n').map(block => block.split('\n'));

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input:string[][]) => {
  let max = 0;

  input.forEach(elf =>{
    const carried = elf.reduce((acc,food) => acc + Number(food), 0);

    if (max < carried) {
      max = carried;
    }
  })

  return max;
};

const goB = (input:string[][]) => {
  const elfs = input.map(elf =>{
    const carried = elf.reduce((acc,food) => acc + Number(food), 0);

    return carried
  })

  elfs.sort((a, b) => b - a);

  return elfs[0] + elfs[1] + elfs[2];
};

/* Tests */

const exampleA = goA(example);
const exampleB = goB(example);

console.log('Example part 1:', exampleA);
console.log('Example part 2:', exampleB);

/* Results */

console.time('Time');
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd('Time');

console.log('Solution to part 1:', resultA);
console.log('Solution to part 2:', resultB);
