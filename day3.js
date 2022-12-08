require('dotenv').config();
const {getInput} = require('./getInput');

const day = 3;
const cookie = process.env.COOKIE;

getInput(day, cookie)
  .then((response) => {
    const input = response.data.split('\n').slice(0,-1);
    
    // Part 1
    const splitInput = input.map(el => {
      const middle = el.length / 2;
      return [el.slice(0,middle),el.slice(middle)];
    });

    const duplicates = splitInput.map(el => {
      for (const letter of el[0]) {
        if (el[1].includes(letter)) {
          return letter;
        }
      }
    });

    const values = duplicates.map(el => {
      const value = el.charCodeAt(0);
      return (value >= 97 ? value - 96 : value - 38);
    });
    
    const total = values.reduce((curr, prev)=> {
      return curr + prev;
    },0);
    console.log(`Part 1 total: ${total}`);

    // Part 2

    const groups = [];
    let i = 0;
    for (const el of input) {
      if (!groups[i]) groups.push([]);
      groups[i].push(el);
      if (groups[i].length === 3) {
        i++;
      }
    }
    // console.log(groups);

    const badges = groups.map(group => {
      const shortest = group.reduce((a,b) => a.length <= b.length ? a : b);
      
      for (const char of shortest) {
        if (group[0].includes(char) && group[1].includes(char) && group[2].includes(char)) {
          return char;
        }
      }
    });

    const badgeValues = badges.map(el => {
      const value = el.charCodeAt(0);
      return (value >= 97 ? value - 96 : value - 38);
    });
    
    const totalBadgeValues = badgeValues.reduce((curr, prev)=> {
      return curr + prev;
    },0);
    console.log(`Part 2 total: ${totalBadgeValues}`);
  
  });