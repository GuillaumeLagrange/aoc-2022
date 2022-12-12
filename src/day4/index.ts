import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = false;

type Entry = {
  frstMin: number;
  scndMin: number;
  frstMax: number;
  scndMax: number;
};

const prepareInput = (rawInput: string): Entry[] =>
  rawInput
    .trim()
    .split('\n')
    .map((line) => {
      const [frst, scnd] = line.split(',');

      return {
        frstMin: Number(frst.split('-')[0]),
        frstMax: Number(frst.split('-')[1]),
        scndMin: Number(scnd.split('-')[0]),
        scndMax: Number(scnd.split('-')[1]),
      };
    });

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInput(readExample());
const preparedInputA = prepareInput(readInput());
const preparedInputB = prepareInput(readInput());

const contains = ({ frstMin, frstMax, scndMin, scndMax }: Entry) => {
  return (
    (frstMin <= scndMin && frstMax >= scndMax) ||
    (scndMin <= frstMin && scndMax >= frstMax)
  );
};

const goA = (input: Entry[]) => {
  return input.reduce((acc, entry) => {
    if (contains(entry)) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

const overlaps = ({ frstMin, frstMax, scndMin, scndMax }: Entry) => {
  return (
    (frstMin <= scndMin && frstMax >= scndMin) ||
    (scndMin <= frstMin && scndMax >= frstMin)
  );
};

const goB = (input: Entry[]) => {
  return input.reduce((acc, entry) => {
    if (overlaps(entry)) {
      return acc + 1;
    }

    return acc;
  }, 0);
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
