import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = false;

type Instruction = {
  value: number;
  from: number;
  to: number;
};

type Input = {
  stacks: string[][];
  instructions: Instruction[];
};

const prepareInput = (rawInput: string): Input => {
  const [crateLines, instructionLines] = rawInput
    .split('\n\n')
    .map((line) => line.split('\n'));

  instructionLines.pop();

  const stackCountLine = crateLines.pop() ?? [];

  const stacksCount = Number(stackCountLine[stackCountLine.length - 1]);

  const stacks: string[][] = [];
  for (let i = 0; i < stacksCount; i++) {
    stacks.push([]);
  }

  for (let i = crateLines.length - 1; i >= 0; i--) {
    const crateLine = crateLines[i];
    for (let j = 0; j < stacksCount; j++) {
      const char = crateLine[1 + 4 * j];
      if (char !== ' ') {
        stacks[j].push(char);
      }
    }
  }

  const instructions: Instruction[] = instructionLines.map((line) => {
    const numberMatches = line.match(/\d+/g);
    if (numberMatches === null) {
      throw new Error();
    }

    return {
      value: Number(numberMatches[0]),
      from: Number(numberMatches[1]) - 1,
      to: Number(numberMatches[2]) - 1,
    };
  });

  return {
    stacks,
    instructions,
  };
};

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInput(readExample());

const goA = ({ stacks, instructions }: Input) => {
  instructions.forEach(({ value, from, to }) => {
    for (let i = 0; i < value; i++) {
      const char = stacks[from].pop();

      if (char === undefined) {
        throw new Error();
      }

      stacks[to].push(char);
    }
  });

  return stacks
    .reduce((acc, stack) => acc.concat(stack[stack.length - 1]), [])
    .join('');
};

const goB = ({ stacks, instructions }: Input) => {
  instructions.forEach(({ value, from, to }) => {
    const chars: string[] = [];
    for (let i = 0; i < value; i++) {
      const char = stacks[from].pop();

      if (char === undefined) {
        throw new Error();
      }

      chars.push(char);
    }

    chars.reverse();
    stacks[to] = [...stacks[to], ...chars];
  });

  return stacks
    .reduce((acc, stack) => acc.concat(stack[stack.length - 1]), [])
    .join('');
};

/* Tests */

const exampleA = goA(preparedExampleA);
const exampleB = goB(preparedExampleB);

console.log('Example part 1:', exampleA);
console.log('Example part 2:', exampleB);

/* Results */

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
