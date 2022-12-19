import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = true;

const RESOURCES = ['ore', 'clay', 'obsidian', 'geode'] as const;

type Resource = typeof RESOURCES[number];

type Resources = {
  ore: number;
  clay: number;
  obsidian: number;
  geode: number;
};

type Blueprint = Record<Resource, Resources> & { maxGeodes: number } & {
  max: Resources;
};

const prepareInput = (rawInput: string): Blueprint[] =>
  rawInput
    .trim()
    .split('\n')
    .map((line) => {
      const matches = line.match(/\d+/g);
      if (matches === null) {
        throw new Error();
      }

      const zeroCost = { ore: 0, clay: 0, obsidian: 0, geode: 0 };

      return {
        maxGeodes: Number.NEGATIVE_INFINITY,
        ore: {
          ...zeroCost,
          ore: Number(matches[1]),
        },
        clay: {
          ...zeroCost,
          ore: Number(matches[2]),
        },
        obsidian: {
          ...zeroCost,
          ore: Number(matches[3]),
          clay: Number(matches[4]),
        },
        geode: {
          ...zeroCost,
          ore: Number(matches[5]),
          obsidian: Number(matches[6]),
        },

        max: {
          ...zeroCost,
          ore: Math.max(
            Number(matches[1]),
            Number(matches[2]),
            Number(matches[3]),
          ),
          clay: Number(matches[4]),
          obsidian: Number(matches[6]),
        },
      };
    });

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInput(readExample());

type State = {
  resources: Resources;
  robots: Resources;
  minute: number;
};

const canAffordRobot = (
  robotToBuild: Resource,
  state: State,
  blueprint: Blueprint,
) => {
  return RESOURCES.every(
    (resource) =>
      state.resources[resource] >= blueprint[robotToBuild][resource],
  );
};

const buildRobot = (
  robotToBuild: Resource,
  state: State,
  blueprint: Blueprint,
) => {
  state.robots[robotToBuild] += 1;
  RESOURCES.forEach((resource) => {
    state.resources[resource] -= blueprint[robotToBuild][resource];
  });
};

const getNewState = ({
  robots,
  resources: { obsidian, geode, ore, clay },
  minute,
}: State): State => ({
  robots: { ...robots },
  minute: minute + 1,
  resources: {
    obsidian: obsidian + robots.obsidian,
    clay: clay + robots.clay,
    geode: geode + robots.geode,
    ore: ore + robots.ore,
  },
});

const killPath = (
  { resources: { geode }, robots: { geode: geodeRobots }, minute }: State,
  { maxGeodes }: Blueprint,
) => {
  const remaining = 32 - minute;
  let maxTheoreticalGeode = geode;
  let theoreticalGeodeRobots = geodeRobots;
  for (let i = 0; i < remaining; i++) {
    maxTheoreticalGeode += theoreticalGeodeRobots;
    theoreticalGeodeRobots += 1;
  }

  return maxGeodes >= maxTheoreticalGeode;
};

const dfs = (state: State, blueprint: Blueprint): number => {
  if (state.minute === 32) {
    if (state.resources.geode > blueprint.maxGeodes) {
      blueprint.maxGeodes = state.resources.geode;
    }

    return state.resources.geode;
  }

  if (killPath(state, blueprint)) {
    return state.resources.geode;
  }

  if (canAffordRobot('geode', state, blueprint)) {
    const newState = getNewState(state);
    buildRobot('geode', newState, blueprint);

    const pathValue = dfs(newState, blueprint);

    if (pathValue > blueprint.maxGeodes) {
      blueprint.maxGeodes = pathValue;
    }

    return pathValue;
  }

  for (let i = 0; i < 3; i++) {
    const resource = RESOURCES[i];
    if (state.robots[resource] > blueprint.max[resource]) {
      continue;
    }

    if (canAffordRobot(resource, state, blueprint)) {
      const newState = getNewState(state);
      buildRobot(resource, newState, blueprint);

      const pathValue = dfs(newState, blueprint);
      if (pathValue > blueprint.maxGeodes) {
        blueprint.maxGeodes = pathValue;
      }
    }
  }

  const pathValue = dfs(getNewState(state), blueprint);

  return pathValue;
};

const goA = (input: Blueprint[]) => {
  console.log(input);
  let answer = 0;

  input.forEach((blueprint, index) => {
    dfs(
      {
        robots: { ore: 1, obsidian: 0, clay: 0, geode: 0 },
        minute: 0,
        resources: { ore: 0, obsidian: 0, clay: 0, geode: 0 },
      },
      blueprint,
    );

    console.log(blueprint.maxGeodes);
    answer += (index + 1) * blueprint.maxGeodes;
  });

  return answer;
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
