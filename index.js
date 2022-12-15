require('dotenv').config();
const fs = require('fs').promises;
const day = process.argv.slice(2);

const {getInput} = require('./helpers/getInput');
const {runtest} = require(`./answers/day_${day}.js`);

const cookie = process.env.COOKIE;

fs.readFile(`./input/day_${day}.txt`, {encoding: 'utf8'})
  // If input file exists, run from file
  .then(data => {
    runtest(data);
  })
  // If input file does not exist, download it
  .catch(() => {
    console.log(`Input file does not exist for day ${day}.\nDownloading now...................`);
    getInput(day, cookie)
      // Once input is downloaded, save to file then run test
      .then((response) => {
        const input = response.data;
        fs.writeFile(`./input/day_${day}.txt`, input)
          .then(()=> {
            runtest(input);
          })
          .catch((err)=>{
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err.response);
      });
  });