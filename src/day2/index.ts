import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = false;

type Play = 'rock' | 'paper' | 'scissors';

type Match = {
  opponent: Play;
  player: Play;
};

const getOpponentplay = (str): Play => {
  if (str === 'A') {
    return 'rock';
  }

  if (str === 'B') {
    return 'paper';
  }

  return 'scissors';
};

const getPlayerPlay = (str): Play => {
  if (str === 'X') {
    return 'rock';
  }

  if (str === 'Y') {
    return 'paper';
  }

  return 'scissors';
};

const getPlayerPlayB = (opponent: Play, str): Play => {
  if (str === 'Y') {
    return opponent;
  }

  if (str === 'X') {
    if (opponent === 'rock') {
      return 'scissors';
    }

    if (opponent === 'paper') {
      return 'rock';
    }

    return 'paper';
  }

  if (opponent === 'rock') {
    return 'paper';
  }

  if (opponent === 'paper') {
    return 'scissors';
  }

  return 'rock';
};

// eslint-disable-next-line complexity
const getMatchPoints = ({ opponent, player }: Match) => {
  if (player === 'rock') {
    if (opponent === 'rock') {
      return 4;
    }

    if (opponent === 'scissors') {
      return 7;
    }

    return 1;
  }

  if (player === 'paper') {
    if (opponent === 'paper') {
      return 5;
    }

    if (opponent === 'rock') {
      return 8;
    }

    return 2;
  }

  if (opponent === 'scissors') {
    return 6;
  }

  if (opponent === 'paper') {
    return 9;
  }

  return 3;
};

const prepareInput = (rawInput: string): Match[] => {
  return rawInput
    .trim()
    .split('\n')
    .map((line) => {
      return {
        opponent: getOpponentplay(line[0]),
        player: getPlayerPlay(line[2]),
      };
    });
};

const prepareInputB = (rawInput: string): Match[] => {
  return rawInput
    .trim()
    .split('\n')
    .map((line) => {
      return {
        opponent: getOpponentplay(line[0]),
        player: getPlayerPlayB(getOpponentplay(line[0]), line[2]),
      };
    });
};

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInputB(readExample());
const preparedInputA = prepareInput(readInput());
const preparedInputB = prepareInputB(readInput());

const goA = (matches: Match[]) => {
  return matches.reduce((acc, match) => acc + getMatchPoints(match), 0);
};

const goB = (matches: Match[]) => {
  return matches.reduce((acc, match) => acc + getMatchPoints(match), 0);
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
