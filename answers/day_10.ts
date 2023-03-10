const cycleLengths = {
  'addx': 2,
  'noop': 1
};

const runCPU = (input) => {

  let cycles = 0;
  let x = 1;
  
  const signalStrength = {
    20: false,
    60: false,
    100: false,
    140: false,
    180: false,
    220: false
  };

  const screen = [[],[],[],[],[],[]];
  let row = 0;

  for (const instruction of input) {
    
    for (let i = 0; i < cycleLengths[instruction[0]]; i++) {
      const pixel = cycles - row * 40;
      cycles++;
      if (Object.keys(signalStrength).includes(String(cycles)) &&
        signalStrength[String(cycles)] === false) {
        signalStrength[String(cycles)] = cycles * x;
      }
      const sprite = [x - 1, x, x + 1];
      if (sprite.includes(pixel)) {
        screen[row].push('#');
      } else {
        screen[row].push('.');
      }
      if (cycles % 40 === 0) {
        row++;
      }

    }
    x += instruction[1] ? Number(instruction[1]) : 0;
  }
   
  return [signalStrength, screen];
};

const runtest = (input) => {
  
  input = input.split('\n').slice(0,-1).map(el => el.split(' '));
  
  const [signalStrength, screen] = runCPU(input);
  
  const sumSignalStrength = Object.values(signalStrength).reduce((curr, prev) => {
    return curr + prev;
  },0);

  console.log(`Sum of the signal strengths at ${Object.keys(signalStrength)} is ${sumSignalStrength}.`);

  const display = screen.map(el => el.join(''));
  console.log(display);
  
};

module.exports = {runtest};