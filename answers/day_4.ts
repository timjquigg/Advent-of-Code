const runtest = (input) => {

  input = input.split('\n').slice(0,-1);
  
  const splitInput = input.map(el => {
    return el.split(',');
  }).map(el => {
    const returnVal = [];
    returnVal.push(el[0].split('-'));
    returnVal.push(el[1].split('-'));
    return returnVal;
  });
  
  // Part 1
  let fullOverlaps = 0;
  
  splitInput.forEach(el => {
    if (
      Number(el[0][0]) <= Number(el[1][0])
    &&
      Number(el[0][1]) >= Number(el[1][1])
    ) {
      fullOverlaps++;
      return;
    }
    
    if (
      Number(el[1][0]) <= Number(el[0][0])
    &&
      Number(el[1][1]) >= Number(el[0][1])
    ) {
      fullOverlaps++;
      return;
    }
  
  });
  
  console.log(`Number of complete overlaps: ${fullOverlaps}`);
  
  // Part 2
  let partialOverlaps = 0;
  
  splitInput.forEach(el => {
    if (
      Number(el[0][0]) <= Number(el[1][0])
    &&
      Number(el[0][1]) >= Number(el[1][0])
    ) {
      partialOverlaps++;
      return;
    }
  
    if (
      Number(el[1][0]) <= Number(el[0][0])
    &&
      Number(el[1][1]) >= Number(el[0][0])
    ) {
      partialOverlaps++;
      return;
    }
  });
  
  console.log(`Number of partial overlaps: ${partialOverlaps}`);
  
};

module.exports = {runtest};

  