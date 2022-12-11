import { test, readInput, readExample } from '../utils/index';

const keyCycles = [20, 60, 100, 140, 180, 220];

type Operation = "addx" | "noop";

type AddX = {
  operation: "addx";
  value: number;
}

type Noop = {
  operation: "noop";
}

type Entry = AddX | Noop;

const prepareInput = (rawInput: string): Entry[] => {
  const lines = rawInput.trim().split('\n');

  return lines.map(line => {
    if (line === "noop") {
      return {operation: "noop"};
    }

    const value = Number(line.split(' ')[1]);

    return {operation: 'addx', value};
  })
};

const input = prepareInput(readInput());
const example = prepareInput(readExample());

const goA = (input: Entry[]) => {
  let returnValue = 0;
  let register = 1;
  let cycles = 1;

  input.forEach((entry) => {
    if (entry.operation === 'noop') {
      cycles += 1;
    }

    if (entry.operation === 'addx') {
      const value = entry.value;

      if (keyCycles.includes(cycles + 1)) {
        returnValue += register * (cycles + 1);
      }

      register += value;
      cycles += 2;
    }

    if (keyCycles.includes(cycles)) {
      returnValue += register * (cycles);
    }

  })

  return returnValue;
};

const getPixel = (cycle: number, register: number) => {
  const crtCol = (cycle-1) % 40;

  if (Math.abs(crtCol - register) <= 1) {
    return '#'
  }

  return ' ';
}

const goB = (input: Entry[]) => {
  let register = 1;
  let cycles = 1;
  let crtRow:string[] = [];

  input.forEach((entry) => {
    if (entry.operation === 'noop') {
      cycles += 1;
    }

    if (entry.operation === 'addx') {
      const value = entry.value;

      crtRow.push(getPixel(cycles + 1, register));

      if (crtRow.length === 40) {
        console.log(crtRow.join(''));
        crtRow = [];
      }

      register += value;
      cycles += 2;

    }

    crtRow.push(getPixel(cycles, register));

    if (crtRow.length === 40) {
      console.log(crtRow.join(''));
      crtRow = [];
    }
  })
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
