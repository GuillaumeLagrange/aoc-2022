import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = false;

type Operation = {
  type: 'mult' | 'add';
  value?: number;
};

type Monkey = {
  items: number[];
  operation: Operation; // square if undefined
  test: number;
  trueMonkey: number;
  falseMonkey: number;
  inspectCount: number;
};

const prepareInput = (rawInput: string): Monkey[] => {
  const monkeyBlocks = rawInput.trim().split('\n\n');

  return monkeyBlocks.map((monkeyBlock) => {
    const monkeyLines = monkeyBlock.split('\n');

    const operationMatch = monkeyLines[2].match(/\d+/);

    const operation: Operation = {
      type: monkeyLines[2].includes('*') ? 'mult' : 'add',
      value: operationMatch !== null ? Number(operationMatch[0]) : undefined,
    };

    const testMatch = monkeyLines[3].match(/\d+/);
    if (testMatch === null) {
      throw new Error();
    }
    const trueMatch = monkeyLines[4].match(/\d+/);
    if (trueMatch === null) {
      throw new Error();
    }

    const falseMatch = monkeyLines[5].match(/\d+/);
    if (falseMatch === null) {
      throw new Error();
    }

    return {
      items: monkeyLines[1].split(':')[1].split(',').map(Number),
      operation,
      test: Number(testMatch[0]),
      trueMonkey: Number(trueMatch[0]),
      falseMonkey: Number(falseMatch[0]),
      inspectCount: 0,
    };
  });
};

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInput(readExample());
const preparedInputA = prepareInput(readInput());
const preparedInputB = prepareInput(readInput());

const getInspectedValue = (prevValue: number, { type, value }: Operation) => {
  const otherValue = value ?? prevValue;
  if (type === 'add') {
    return prevValue + otherValue;
  }

  return prevValue * otherValue;
};

const goA = (monkeys: Monkey[]) => {
  for (let i = 0; i < 20; i++) {
    monkeys.forEach(
      ({ items, operation, test, falseMonkey, trueMonkey }, monkeyIndex) => {
        items.forEach((item) => {
          const inspectedValue = getInspectedValue(item, operation);

          const newValue = Math.floor(inspectedValue / 3);

          const thrownMonkey = newValue % test === 0 ? trueMonkey : falseMonkey;

          monkeys[thrownMonkey].items.push(newValue);

          monkeys[monkeyIndex].inspectCount += 1;
          monkeys[monkeyIndex].items = [];
        });
      },
    );
  }

  monkeys.sort(
    (monkeyA, monkeyB) => monkeyB.inspectCount - monkeyA.inspectCount,
  );

  return monkeys[0].inspectCount * monkeys[1].inspectCount;
};

const goB = (monkeys: Monkey[]) => {
  const floorValue = monkeys.reduce((acc, monkey) => acc * monkey.test, 1);
  for (let i = 0; i < 10000; i++) {
    monkeys.forEach(
      ({ items, operation, test, falseMonkey, trueMonkey }, monkeyIndex) => {
        items.forEach((item) => {
          const inspectedValue = getInspectedValue(item, operation);

          const newValue = inspectedValue % floorValue;

          const thrownMonkey = newValue % test === 0 ? trueMonkey : falseMonkey;

          monkeys[thrownMonkey].items.push(newValue);

          monkeys[monkeyIndex].inspectCount += 1;
          monkeys[monkeyIndex].items = [];
        });
      },
    );
  }

  monkeys.sort(
    (monkeyA, monkeyB) => monkeyB.inspectCount - monkeyA.inspectCount,
  );

  return monkeys[0].inspectCount * monkeys[1].inspectCount;
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
