require('dotenv').config();
const {getInput} = require('./getInput');

const day = 6;
const cookie = process.env.COOKIE;

getInput(day, cookie)
  .then((response) => {
    
    // Parsing Data
    const input = response.data.split('\n').slice(0,-1);

    // Part 1 Variables
    const fourDigits = [];
    let packetMarker = null;
    
    // Part 2 Variables
    const fourteenDigits = [];
    let messageMarker = null;
    
    for (const i in input[0]) {
      
      // Part 1:
      if (!packetMarker) {
        if (fourDigits.length === 4) {
          const duplicates = fourDigits.filter((item, index) => fourDigits.indexOf(item) !== index);
          if (duplicates.length === 0) {
            packetMarker = i;
          }
          fourDigits.shift();
        }
        fourDigits.push(input[0][i]);
      }

      // Part 2
      if (!messageMarker) {
        if (fourteenDigits.length === 14) {
          const duplicates = fourteenDigits.filter((item, index) => fourteenDigits.indexOf(item) !== index);
          if (duplicates.length === 0) {
            messageMarker = i;
            break;
          }
          fourteenDigits.shift();
        }
        fourteenDigits.push(input[0][i]);
      }
    }
    console.log(`Packet marker found at: ${packetMarker}`);
    console.log(`Message marker found at: ${messageMarker}`);

  });