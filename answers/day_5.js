const runtest = (input) => {

  input = input.split('\n').slice(0,-1);
  const crates = input.slice(0,input.findIndex(el => el === ''));
  const moves = input.slice(crates.length + 1);
  
  const crateObj = {};
  crates.forEach(el => {
    let j = 0;
    for (let i = 1; i < el.length; i += 4) {
      if (parseInt(el[i])) {
        continue;
      }
      
      j++;
      if (el[i] === ' ') {
        continue;
      }
  
      if (crateObj[j]) {
        crateObj[j].splice(0,0, el[i]);
        continue;
      }
  
      crateObj[j] = [el[i]];
    }
  });
  
  console.log('Original Crate positions: \n', crateObj);
  
  const movesParsed = moves.map(el => {
    const temp = el.split(' ');
    const split = [];
    for (const item of temp) {
      if (item.match(/\d+/)) {
        split.push(item);
      }
    }
    return split;
  });
  
  // Part 1:
  const part1Crates = JSON.parse(JSON.stringify(crateObj));
  
  movesParsed.forEach(move => {
    for (let i = 0; i < move[0]; i++) {
      part1Crates[move[2]].push(part1Crates[move[1]].pop());
    }
  });
  
  let topCrates = '';
  for (const col in part1Crates) {
    topCrates += part1Crates[col][part1Crates[col].length - 1];
  }
  
  console.log('Part 1:');
  console.log('New Crate positions:\n', part1Crates);
  console.log(`Top row of crates: ${topCrates}`);
  
  // Part 2:
  const part2Crates = JSON.parse(JSON.stringify(crateObj));
  
  movesParsed.forEach(move => {
    const cratesToMove = part2Crates[move[1]].slice(-move[0]);
    part2Crates[move[2]].push(...cratesToMove);
    part2Crates[move[1]].splice(-cratesToMove.length,cratesToMove.length);
  });
  
  let topCrates2 = '';
  for (const col in part2Crates) {
    topCrates2 += part2Crates[col][part2Crates[col].length - 1];
  }
  
  console.log('Part 2:');
  console.log('New Crate positions:\n', part2Crates);
  console.log(`Top row of crates: ${topCrates2}`);
  
};

module.exports = {runtest};
