import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = false;

type Rotation = 'R' | 'L';

type Orientation = number;

type Maze = string[][];

type Coordinates = {
  x: number;
  y: number;
};

type NumberInstruction = {
  type: 'number';
  value: number;
};

type Instruction = Rotation | number;

type Input = {
  maze: Maze;
  instructions: Instruction[];
};

const printMaze = (maze: string[][]) => {
  let str = '';
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      str = str.concat(maze[i][j]);
    }

    str = str.concat('\n');
  }

  console.log(str);
};

const prepareInput = (rawInput: string): Input => {
  const [mazeString, instructionsString] = rawInput.split('\n\n');

  const maze = mazeString
    .split('\n')
    .map((mazeStringLine) => mazeStringLine.split(''));

  const instructionsMatches = instructionsString.match(/R|L|\d+/g);

  const instructions =
    instructionsMatches?.map((match) =>
      match === 'R' || match === 'L' ? match : Number(match),
    ) ?? [];

  return {
    maze,
    instructions,
  };
};

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInput(readExample());

const getNextCoordinates = (
  { x, y, orientation }: Coordinates & { orientation: Orientation },
  maze: string[][],
): Coordinates => {
  switch (orientation) {
    case 0: {
      return {
        x: x < maze[y].length - 1 ? x + 1 : maze[y].findIndex((c) => c !== ' '),
        y,
      };
    }
    case 1: {
      return {
        y:
          y < maze.length - 1 && maze[y + 1][x] !== ' '
            ? y + 1
            : maze.findIndex((c) => c[x] !== ' '),
        x,
      };
    }
    case 2: {
      return {
        x:
          x > 0 && maze[y][x - 1] !== ' '
            ? x - 1
            : maze.length -
              1 -
              [...maze[y]].reverse().findIndex((c) => c !== ' '),
        y,
      };
    }
    default:
      return {
        y:
          y > 0 && maze[y - 1][x] !== ' '
            ? y - 1
            : maze.length -
              1 -
              [...maze].reverse().findIndex((c) => c[x] !== ' '),
        x,
      };
  }
};

const goA = ({ maze, instructions }: Input) => {
  let y = 0;
  let x = maze[y].findIndex((char) => char !== ' ');
  let orientation: Orientation = 0;

  printMaze(maze);

  instructions.forEach((instruction) => {
    const startX = x;
    const startY = y;

    if (instruction === 'R') {
      orientation = (orientation + 1) % 4;

      return;
    }

    if (instruction === 'L') {
      orientation = (orientation + 3) % 4;

      return;
    }

    for (let i = 0; i < instruction; i++) {
      const { x: nextX, y: nextY } = getNextCoordinates(
        { x, y, orientation },
        maze,
      );

      if (maze[nextY][nextX] === '#') {
        console.log(`Stopping because of wall in (${nextX}, ${nextY})`);
        break;
      }

      x = nextX;
      y = nextY;
    }

    console.log(
      `orientation ${orientation} len ${instruction}, (${startX}, ${startY})->(${x}, ${y})`,
    );
  });

  // print(getNextCoordinates({ x: 8 }, maze));
  console.log(maze[3][4]);

  return 1000 * (y + 1) + 4 * (x + 1) + orientation;
};

const goB = (input) => {
  return;
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
