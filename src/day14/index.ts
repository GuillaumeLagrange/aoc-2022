import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = false;

type Content = 'air' | 'rock' | 'sand';

type Input = {
  startX: number;
  minX: number;
  maxX: number;
  maxY: number;
  cave: Content[][];
};

const contentToSymbol = (content: Content) => {
  if (content === 'air') {
    return '⬜';
  }

  if (content === 'rock') {
    return '⬛';
  }

  return '🟨';
};

const printCave = (cave: Content[][]) => {
  let caveString = '';
  for (let y = 0; y < cave[0].length; y++) {
    for (let x = 0; x < cave.length; x++) {
      caveString = caveString.concat(contentToSymbol(cave[x][y]));
    }
    caveString = caveString.concat('\n');
  }

  console.log(caveString);
};

const prepareInput = (rawInput: string): Input => {
  const lines = rawInput.trim().split('\n');
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  const rocks: number[][][] = [];

  lines.map((line) => {
    const points = line.split(' -> ').map((a) => a.split(',').map(Number));

    points.forEach(([x, y]) => {
      if (x < minX) {
        minX = x;
      }

      if (x > maxX) {
        maxX = x;
      }

      if (y > maxY) {
        maxY = y;
      }
    });

    rocks.push(points);
  });

  maxX += 1;

  const cave: Content[][] = [];
  for (let x = 0; x < maxX - minX; x++) {
    cave.push([]);

    for (let y = 0; y <= maxY; y++) {
      cave[x].push('air');
    }
  }

  rocks.forEach((rock) => {
    rock.forEach(([absoluteX, y], rockIndex) => {
      if (rockIndex === rock.length - 1) {
        return;
      }

      const x = absoluteX - minX;

      const [absoluteNextX, nextY] = rock[rockIndex + 1];
      const nextX = absoluteNextX - minX;

      if (x === nextX) {
        for (let j = 0; j <= Math.abs(y - nextY); j++) {
          const rockX = x;
          const rockY = Math.min(y, nextY) + j;

          cave[rockX][rockY] = 'rock';
        }

        return;
      }

      if (y === nextY) {
        for (let i = 0; i <= Math.abs(x - nextX); i++) {
          const rockX = Math.min(x, nextX) + i;
          const rockY = y;

          cave[rockX][rockY] = 'rock';
        }

        return;
      }
    });
  });

  const startX = 500 - minX;

  return {
    cave,
    minX,
    maxX,
    maxY,
    startX,
  };
};

const prepareInputB = (rawInput: string): Input => {
  const lines = rawInput.trim().split('\n');
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  const rocks: number[][][] = [];

  lines.map((line) => {
    const points = line.split(' -> ').map((a) => a.split(',').map(Number));

    points.forEach(([x, y]) => {
      if (x < minX) {
        minX = x;
      }

      if (x > maxX) {
        maxX = x;
      }

      if (y > maxY) {
        maxY = y;
      }
    });

    rocks.push(points);
  });

  maxX += 1;
  maxY += 2;

  const cave: Content[][] = [];
  for (let x = 0; x < maxX - minX; x++) {
    cave.push([]);

    for (let y = 0; y <= maxY; y++) {
      cave[x].push('air');
    }

    cave[x][maxY] = 'rock';
  }

  rocks.forEach((rock) => {
    rock.forEach(([absoluteX, y], rockIndex) => {
      if (rockIndex === rock.length - 1) {
        return;
      }

      const x = absoluteX - minX;

      const [absoluteNextX, nextY] = rock[rockIndex + 1];
      const nextX = absoluteNextX - minX;

      if (x === nextX) {
        for (let j = 0; j <= Math.abs(y - nextY); j++) {
          const rockX = x;
          const rockY = Math.min(y, nextY) + j;

          cave[rockX][rockY] = 'rock';
        }

        return;
      }

      if (y === nextY) {
        for (let i = 0; i <= Math.abs(x - nextX); i++) {
          const rockX = Math.min(x, nextX) + i;
          const rockY = y;

          cave[rockX][rockY] = 'rock';
        }

        return;
      }
    });
  });

  const startX = 500 - minX;

  return {
    cave,
    minX,
    maxX,
    maxY,
    startX,
  };
};

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInputB(readExample());

const goA = ({ cave, maxX, maxY, minX, startX }: Input) => {
  let x = startX;
  let y = 0;
  let sandCount = 0;

  while (true) {
    if (y === maxY) {
      break;
    }

    if (cave[x][y + 1] === 'air') {
      y += 1;
      continue;
    }

    if (x === 0) {
      break;
    }

    if (cave[x - 1][y + 1] === 'air') {
      x -= 1;
      y += 1;
      continue;
    }

    if (x === maxX - minX) {
      break;
    }

    if (cave[x + 1][y + 1] === 'air') {
      x += 1;
      y += 1;
      continue;
    }

    sandCount += 1;
    cave[x][y] = 'sand';
    x = startX;
    y = 0;
  }

  return sandCount;
};

const goB = ({ cave, maxY, startX }: Input) => {
  let x = startX;
  let y = 0;
  let sandCount = 0;

  while (true) {
    if (cave[x][y] === 'sand') {
      break;
    }

    if (cave[x][y + 1] === 'air') {
      y += 1;
      continue;
    }

    if (x === 0) {
      cave.unshift([]);
      for (let j = 0; j < maxY; j++) {
        cave[x][j] = 'air';
      }

      cave[x][maxY] = 'rock';
      x += 1;
      startX += 1;
    }

    if (cave[x - 1][y + 1] === 'air') {
      x -= 1;
      y += 1;
      continue;
    }

    if (x === cave.length - 1) {
      cave.push([]);
      for (let j = 0; j < maxY; j++) {
        cave[x + 1][j] = 'air';
      }

      cave[x + 1][maxY] = 'rock';
    }

    if (cave[x + 1][y + 1] === 'air') {
      x += 1;
      y += 1;
      continue;
    }

    sandCount += 1;
    cave[x][y] = 'sand';
    x = startX;
    y = 0;
  }

  return sandCount;
};

/* Tests */

const exampleA = goA(preparedExampleA);
const exampleB = goB(preparedExampleB);

console.log('Example part 1:', exampleA);
console.log('Example part 2:', exampleB);

/* Results */

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
