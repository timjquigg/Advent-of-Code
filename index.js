require('dotenv').config();
const day = process.argv.slice(2);

const {getInput} = require('./helpers/getInput');
const {runtest} = require(`./answers/day_${day}.js`);

const cookie = process.env.COOKIE;

getInput(day, cookie)
  .then((response) => {
    
    const input = response.data;
    runtest(input);
  });
