# Advent of Code 2022

## Intro

This repo contains zero-setup environment for [Advent of Code](https://adventofcode.com/) challenges, with:

- automatic creation of a challenge template,
- automatic execution of a challenge code (with reloads),
- quick utils for testing and reading input from a file.

## Installation

Clone the repo and go to the created folder, and run

```
pnpm install
```

## Running dev mode

```
pnpm start <N>
```

Example:

```
pnpm start 1
```

If the day<N> folder does not exist, it will be created from template, and content of the input and puzzle will be put in their respective files

## Automatic retrieval of input

You need [aoc-cli](https://github.com/scarvalhojr/aoc-cli) installed, available in your path, and your session cookie setup to be able to retrieve your input
