import { readExample, readInput } from '../utils/index';

const ONLY_EXAMPLES = false;

type Link = {
  value: number;
  next: Link;
  prev: Link;
};

const decryptionKey = 811589153;

const printList = (link: Link, length: number) => {
  let currentLink = link;
  let str = '';
  for (let i = 0; i < length; i++) {
    str = str.concat(currentLink.value.toString()).concat(' ');
    currentLink = currentLink.next;
  }

  console.log(str);
};

const prepareInput = (rawInput: string): Link[] => {
  //@ts-expect-error
  const links: Link[] = rawInput
    .trim()
    .split('\n')
    .map((line) => ({
      value: Number(line),
      next: null,
      prev: null,
    }));

  links.forEach((link, index) => {
    link.next = links[(index + 1) % links.length];
    link.prev = links[(index - 1 + links.length) % links.length];
  });

  return links;
};

const prepareInputB = (rawInput: string): Link[] => {
  //@ts-expect-error
  const links: Link[] = rawInput
    .trim()
    .split('\n')
    .map((line) => ({
      value: Number(line) * decryptionKey,
      next: null,
      prev: null,
    }));

  links.forEach((link, index) => {
    link.next = links[(index + 1) % links.length];
    link.prev = links[(index - 1 + links.length) % links.length];
  });

  return links;
};

const preparedExampleA = prepareInput(readExample());
const preparedExampleB = prepareInputB(readExample());

const goA = (input: Link[]) => {
  for (let i = 0; i < input.length; i++) {
    const link = input[i];

    let linkBeforeNewPlace = link;
    let moveValue = link.value % (input.length - 1);

    if (moveValue < 0) {
      moveValue += input.length - 1;
    }

    if (moveValue === 0) {
      continue;
    }

    const prevBeforeMove = link.prev;
    const nextBeforeMove = link.next;

    for (let j = 0; j < moveValue; j++) {
      linkBeforeNewPlace = linkBeforeNewPlace.next;
    }

    prevBeforeMove.next = nextBeforeMove;
    nextBeforeMove.prev = prevBeforeMove;
    link.prev = linkBeforeNewPlace;
    link.next = linkBeforeNewPlace.next;
    linkBeforeNewPlace.next.prev = link;
    linkBeforeNewPlace.next = link;
  }

  let answerLink = input.find(({ value }) => value === 0);
  if (answerLink === undefined) {
    throw new Error();
  }

  let answer = 0;
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 1000; i++) {
      answerLink = answerLink?.next;
    }
    answer += answerLink.value;
  }

  return answer;
};

const goB = (input: Link[]) => {
  for (let k = 0; k < 10; k++) {
    for (let i = 0; i < input.length; i++) {
      const link = input[i];

      let linkBeforeNewPlace = link;
      let moveValue = link.value % (input.length - 1);

      if (moveValue < 0) {
        moveValue += input.length - 1;
      }

      if (moveValue === 0) {
        continue;
      }

      const prevBeforeMove = link.prev;
      const nextBeforeMove = link.next;

      for (let j = 0; j < moveValue; j++) {
        linkBeforeNewPlace = linkBeforeNewPlace.next;
      }

      prevBeforeMove.next = nextBeforeMove;
      nextBeforeMove.prev = prevBeforeMove;
      link.prev = linkBeforeNewPlace;
      link.next = linkBeforeNewPlace.next;
      linkBeforeNewPlace.next.prev = link;
      linkBeforeNewPlace.next = link;
    }
  }

  let answerLink = input.find(({ value }) => value === 0);
  if (answerLink === undefined) {
    throw new Error();
  }

  let answer = 0;
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 1000; i++) {
      answerLink = answerLink?.next;
    }
    answer += answerLink.value;
  }

  return answer;
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
