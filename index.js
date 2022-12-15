require('dotenv').config();
const fs = require('fs').promises;
const day = process.argv.slice(2);

const {runtest} = require(`./answers/day_${day}.js`);

fs.readFile(`./input/day_${day}.txt`, {encoding: 'utf8'})
  // If input file exists, run from file
  .then(data => {
    runtest(data);
  })
  // If input file does not exist, download it
  .catch((err) => {
    console.log(err);
  });