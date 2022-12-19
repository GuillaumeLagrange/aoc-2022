import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = true;

const RESOURCES = ['ore', 'clay', 'obsidian'] as const;

type Resource = typeof RESOURCES[number];

type Resources = {
  ore: number;
  clay: number;
  obsidian: number;
};

type Blueprint = Record<Resource, Resources>;

const prepareInput = (rawInput: string): Blueprint[] =>
  rawInput
    .trim()
    .split('\n')
    .map((line) => {
      const matches = line.match(/\d+/g);
      if (matches === null) {
        throw new Error();
      }

      return {
        ore: { ore: Number(matches[1]), clay: 0, obsidian: 0 },
        clay: { ore: Number(matches[2]), clay: 0, obsidian: 0 },
        obsidian: {
          ore: Number(matches[3]),
          clay: Number(matches[4]),
          obsidian: 0,
        },
      };
    });

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInput(readExample());

type State = {
  resources: Resources;
  robots: Resources;
  blueprint: Blueprint;
  minute: number;
};

const canAffordRobot = (robotToBuild: Resource, state: State) => {
  return RESOURCES.every(
    (resource) =>
      state.resources[resource] >= state.blueprint[robotToBuild][resource],
  );
};

const nextMinute = (state: State): number | number[] => {
  const newState = { ...state };

  RESOURCES.forEach((resource) => {
    newState.resources[resource] += newState.robots[resource];
  });

  newState.minute += 1;

  if (newState.minute === 24) {
    return newState.resources.obsidian;
  }

  const newStates: State[] = [{ ...newState }];

  RESOURCES.forEach((resourceToBuild) => {
    if (canAffordRobot(resourceToBuild, newState)) {
      const robotBuildState = { ...newState };
      RESOURCES.forEach(
        (resource) =>
          (robotBuildState.resources[resource] -=
            robotBuildState.blueprint[resourceToBuild][resource]),
      );
      robotBuildState.robots[resourceToBuild] += 1;
      newStates.push(robotBuildState);
    }
  });

  return newStates.flatMap(nextMinute);
};

const goA = (input: Blueprint[]) => {
  console.log(input);

  input.forEach((blueprint) => {
    const result = nextMinute({
      robots: { ore: 1, obsidian: 0, clay: 0 },
      minute: 0,
      resources: { ore: 0, obsidian: 0, clay: 0 },
      blueprint,
    });

    console.log(result);
  });

  return;
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
