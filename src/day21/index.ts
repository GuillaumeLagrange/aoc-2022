import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = false;

type Operation = '+' | '-' | '*' | '/';

type OperationMonkey = {
  type: Operation;
  left: string;
  right: string;
};

type NumberMonkey = {
  type: 'number';
  value: number;
};

type Monkey = OperationMonkey | NumberMonkey;

type Input = Record<string, Monkey>;

const prepareInput = (rawInput: string): Input => {
  return rawInput
    .trim()
    .split('\n')
    .reduce((acc, line) => {
      const [monkeyName, monkeyValue] = line.split(':');

      if (monkeyValue.length > 5) {
        const [left, operation, right] = monkeyValue.trim().split(' ');

        return {
          ...acc,
          [monkeyName]: {
            type: operation as Operation,
            left,
            right,
          },
        };
      }

      return {
        ...acc,
        [monkeyName]: {
          type: 'number',
          value: Number(monkeyValue),
        },
      };
    }, {} as Record<string, Monkey>);
};

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInput(readExample());

const resolveMonkey = (monkey: Monkey, input: Input): number => {
  if (monkey.type === 'number') {
    return monkey.value;
  }

  if (monkey.type === '+') {
    return (
      resolveMonkey(input[monkey.left], input) +
      resolveMonkey(input[monkey.right], input)
    );
  }

  if (monkey.type === '-') {
    return (
      resolveMonkey(input[monkey.left], input) -
      resolveMonkey(input[monkey.right], input)
    );
  }

  if (monkey.type === '*') {
    return (
      resolveMonkey(input[monkey.left], input) *
      resolveMonkey(input[monkey.right], input)
    );
  }

  return (
    resolveMonkey(input[monkey.left], input) /
    resolveMonkey(input[monkey.right], input)
  );
};

const goA = (input: Input) => {
  return resolveMonkey(input['root'], input);
};

const goB = (input: Input) => {
  let humn = 1;

  if (input['root'].type === 'number') {
    throw new Error();
  }

  const leftRoot = input['root'].left;
  const rightRoot = input['root'].right;

  const rightRootValue = resolveMonkey(input[rightRoot], input);

  input['humn'] = {
    type: 'number',
    value: 1,
  };
  const oneValue = resolveMonkey(input[leftRoot], input);

  input['humn'] = {
    type: 'number',
    value: 2,
  };
  const twoValue = resolveMonkey(input[leftRoot], input);

  const linearFactor = twoValue - oneValue;

  while (true) {
    input['humn'] = {
      type: 'number',
      value: humn,
    };

    const leftRootValue = resolveMonkey(input[leftRoot], input);

    console.log(
      `humn: ${humn}, left: ${leftRootValue}, right: ${rightRootValue}`,
    );

    if (leftRootValue === rightRootValue) {
      return humn;
    }

    humn += Math.floor((rightRootValue - leftRootValue) / linearFactor);
  }
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
