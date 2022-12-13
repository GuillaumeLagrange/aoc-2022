/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = false;

type Signal = number[] | Signal[];

type Entry = {
  frst: Signal;
  scnd: Signal;
};

const prepareInput = (rawInput: string): Entry[] => {
  const entries = rawInput
    .trim()
    .split('\n\n')
    .map((doubleLine) => {
      const [firstLine, secondLine] = doubleLine.split('\n');

      return {
        frst: JSON.parse(firstLine.trim()) as Signal,
        scnd: JSON.parse(secondLine.trim()) as Signal,
      };
    });

  return entries;
};

const prepareInputB = (rawInput: string): Signal[] => {
  const entries = rawInput
    .trim()
    .split('\n\n')
    .flatMap((doubleLine) => {
      const [firstLine, secondLine] = doubleLine.split('\n');

      return [
        JSON.parse(firstLine.trim()) as Signal,
        JSON.parse(secondLine.trim()) as Signal,
      ];
    });

  return entries;
};

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInputB(readExample());

const isEntryOrederd = ({ frst, scnd }: Entry): boolean | undefined => {
  for (let i = 0; i < frst.length; i++) {
    if (scnd[i] === undefined) {
      return false;
    }

    if (typeof frst[i] === 'number' && typeof scnd[i] === 'number') {
      if (frst[i] < scnd[i]) {
        return true;
      }

      if (frst[i] > scnd[i]) {
        return false;
      }

      continue;
    }

    if (typeof frst[i] === 'object' && typeof scnd[i] === 'object') {
      const retValue = isEntryOrederd({
        frst: frst[i] as Signal,
        scnd: scnd[i] as Signal,
      });

      if (retValue === undefined) {
        continue;
      }

      return retValue;
    }

    if (typeof frst[i] !== 'number') {
      const retValue = isEntryOrederd({
        frst: frst[i] as number[],
        scnd: [scnd[i]] as Signal[],
      });

      if (retValue === undefined) {
        continue;
      }

      return retValue;
    }

    const retValue = isEntryOrederd({
      frst: [frst[i]] as Signal[],
      scnd: scnd[i] as number[],
    });

    if (retValue === undefined) {
      continue;
    }

    return retValue;
  }

  if (scnd[frst.length] !== undefined) {
    return true;
  }

  return undefined;
};

const goA = (input: Entry[]) => {
  return input.reduce((acc, entry, index) => {
    const returnValue = isEntryOrederd(entry);
    if (returnValue === true) {
      return acc + 1 + index;
    }

    return acc;
  }, 0);
};

const goB = (input: Signal[]) => {
  const signals = input.concat([[[2]], [[6]]]);

  signals.sort((signalA, signalB) => {
    if (isEntryOrederd({ frst: signalA, scnd: signalB }) === true) {
      return -1;
    }

    return 1;
  });

  const twoIndex = signals.findIndex(
    (signal) => JSON.stringify(signal) === '[[2]]',
  );

  const sixIndex = signals.findIndex(
    (signal) => JSON.stringify(signal) === '[[6]]',
  );

  return (twoIndex + 1) * (sixIndex + 1);
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
  const preparedInputB = prepareInputB(readInput());
  console.time('Time');
  const resultA = goA(preparedInputA);
  const resultB = goB(preparedInputB);
  console.timeEnd('Time');

  console.log('Solution to part 1:', resultA);
  console.log('Solution to part 2:', resultB);
}
