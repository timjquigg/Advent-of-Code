const key1 = {
  A: {    //Rock
    X: 4, //Rock
    Y: 8, //Paper
    Z: 3  //Scissors
  },
  B: {    //Paper
    X: 1, //Rock
    Y: 5, //Paper
    Z: 9  //Scissors
  },
  C: {    //Scissors
    X: 7, //Rock
    Y: 2, //Paper
    Z: 6  //Scissors
  }
};

const key2 = {
  A: {    //Rock
    X: 3, //Scissors
    Y: 4, //Rock
    Z: 8  //Paper
  },
  B: {    //Paper
    X: 1, //Rock
    Y: 5, //Paper
    Z: 9  //Scissors
  },
  C: {    //Scissors
    X: 2, //Paper
    Y: 6, //Scissors
    Z: 7  //Rock
  }
};

const runtest = (input) => {

  const parsedInput = input.split('\n').map(el => {
    return el.split(' ');
  });
  
  // Part 1
  const scores = parsedInput.slice(0,-1).map(el => {
    return key1[el[0]][el[1]];
  });
  
  const sum = scores.reduce((prev, curr)=> {
    return prev + curr;
  },0);
  
  console.log(sum);

  // Part 2
  const scores2 = parsedInput.slice(0,-1).map(el => {
    return key2[el[0]][el[1]];
  });
  
  const sum2 = scores2.reduce((prev, curr)=> {
    return prev + curr;
  },0);
  
  console.log(sum2);
  
};

module.exports = {runtest};