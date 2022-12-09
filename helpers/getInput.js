const axios = require('axios');

const getInput = async(day, cookie) => {

  const config = {
    headers: {
      cookie:
      cookie}};
      
  const year = 2022;
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const response = await axios.get(url, config);
  return response;
};

module.exports = {getInput};