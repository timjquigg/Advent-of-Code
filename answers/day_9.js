const key = {
  'R': [1, 0],
  'L': [-1, 0],
  'U': [0, 1],
  'D': [0, -1]
};

const moveHead = (input) => {
  const start = [0,0];
  const history = [start];

  for (let i = 0; i < input.length; i++) {
    const move = [];
    for (let j = 0; j < Number(input[i][1]); j++) {
      move.push(key[input[i][0]]);
    }
    move.forEach(el => {
      const lastLocation = history.slice(-1)[0];
      history.push([el[0] + lastLocation[0], el[1] + lastLocation[1]]);
    });
  }

  return history;
};

const moveTail = (headPositions) => {
  const start = [0,0];
  const tailPositions = [start];

  // Loop through head positions:
  for (let i = 0; i < headPositions.length; i++) {
    const tailLocation = tailPositions.slice(-1)[0];
    let newLocation;
    
    // Compare distance between head & tail
    const diffX = headPositions[i][0] - tailLocation[0];
    const diffY = headPositions[i][1] - tailLocation[1];
    
    if (Math.abs(diffX) <= 1 && Math.abs(diffY) <= 1) {
      // console.log('No changes needed');
      continue;
    }

    if (Math.abs(diffX) > 1 && diffY === 0) {
      // console.log('X difference too big');
      const changeX = diffX / Math.abs(diffX);
      newLocation = [tailLocation[0] + changeX, tailLocation[1]];
    }
    
    if (Math.abs(diffY) > 1 && diffX === 0) {
      // console.log('Y difference too big');
      const changeY = diffY / Math.abs(diffY);
      newLocation = [tailLocation[0], tailLocation[1] + changeY];
    }

    if ((Math.abs(diffX) > 1 && Math.abs(diffY) >= 1) || (Math.abs(diffY) > 1 && Math.abs(diffX) >= 1)) {
      // console.log('Diagonal');
      const changeX = diffX / Math.abs(diffX);
      const changeY = diffY / Math.abs(diffY);
      newLocation = [tailLocation[0] + changeX, tailLocation[1] + changeY];
    }
    
    // Add new tail position to array
    tailPositions.push(newLocation);
  }

  return tailPositions;
};

const getUnique = (positions) => {
  
  const uniqueObj = {};

  // Iteration
  for (let i = 0; i < positions.length; i++) {
    // The current array, from the array of arrays
    const currentPosition = positions[i];
 
    // The JSON stringified version of the current array
    const stringified = JSON.stringify(currentPosition);
 
    // add current to obj, if current position already there nothing will happen
    uniqueObj[stringified] = currentPosition;
  }


  const results = Object.values(uniqueObj);

  return results;
};

const runtest = (input) => {
  
  input = input.split('\n').map(el => el.split(' ')).slice(0,-1);
  
  const numberOfTails = 9;
  
  const headPositions = moveHead(input);
  const tailPositions = [];
  for (let i = 0; i < numberOfTails; i++) {
    if (i === 0) {
      tailPositions[i] = moveTail(headPositions);
      continue;
    }
    tailPositions[i] = moveTail(tailPositions[i - 1]);
  }

  // Part 1
  const oneTailUniquePositions = getUnique(tailPositions[0]);
  console.log(`Number of unique locations visited by the tail: ${oneTailUniquePositions.length}`);
  
  // Part 2
  const nineTailsUniqueTailPositions = getUnique(tailPositions.slice(-1)[0]);
  console.log(`Number of unique locations visited by the tail: ${nineTailsUniqueTailPositions.length}`);
};

module.exports = {runtest};