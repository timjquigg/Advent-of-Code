require('dotenv').config();
const fs = require('fs').promises;
const day = process.argv.slice(2);

const {getInput} = require('./helpers/getInput');
const {runtest} = require(`./answers/day_${day}.js`);

const cookie = process.env.COOKIE;

fs.readFile(`./input/day_${day}.txt`, {encoding: 'utf8'})
  .then(data => {
    runtest(data);
  })
  .catch(() => {
    console.log(`Input file does nto exist for day ${day}. Downloading now......`);
    getInput(day, cookie)
      .then((response) => {
        const input = response.data;
        // runtest(input);
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