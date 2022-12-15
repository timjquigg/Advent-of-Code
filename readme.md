# Advent of Code 2022

This is my first attempt at [Advent of Code](https://adventofcode.com/) and I wanted to document it. From the Advent of Code About page:
>Advent of Code is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like. People use them as interview prep, company training, university coursework, practice problems, a speed contest, or to challenge each other.

## Setup

### Technologies

* Node.js
* Axios
* dotenv

Install dependencies with

`npm install`

Create a .env file that contains your cookie used by your browser when logged into the Advent of Code website.

Your solution for each day should be in a file in the [/answers](/answers) foler. Files are named: **day_X.js** where **X** denotes the day number.

There is a template file for future days in the [/answers](/answers) folder. Copies can be created using the npm script

`npm run copy --day`

where `--day` refers to the new day file you would like to create. This script also downloads the input for the day and saves it to a file in the [/input](/input) folder.


To run your tests, simply use 

`npm run day --day` 

where `--day` denotes the day you would like to run.
