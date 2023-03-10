require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");

const { getInput } = require("./getInput");

const day = process.argv.slice(2);
const cookie = process.env.COOKIE;

((day) => {
  // Copy template to new answer file
  fs.copyFile(
    path.resolve(__dirname, "../answers/template.ts"),
    path.resolve(__dirname, `../answers/day_${day}.ts`)
  )
    .then(() => {
      console.log(`template.ts was copied to day_${day}.ts`);
    })
    .catch((err) => {
      throw err;
    });

  // Download input for the day and then write to input file
  getInput(day, cookie)
    // Once input is downloaded, save to file then run test
    .then((response) => {
      const input = response.data;
      fs.writeFile(`./input/day_${day}.txt`, input)
        .then(() => {
          console.log(
            `Input for day ${day} has bee downloaded to /input/day_${day}.txt`
          );
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err.response);
    });
})(day);
