const { copyFile } = require('fs');
const path = require('path');
const day = process.argv.slice(2);

((day) => {

  copyFile(path.resolve(__dirname, '../answers/template.js'), path.resolve(__dirname,`../answers/day_${day}.js`), (err) => {
    if (err) throw err;
    console.log(`template.js was copied to day_${day}.js`);

  });
})(day);