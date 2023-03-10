export const runtest = (input: string) => {
  const inputNumbers = input.split("\n\n").map((element) => {
    return element.split("\n");
  });

  const sumArray = inputNumbers.map((element) => {
    return element.reduce((prev, curr) => {
      return Number(prev) + Number(curr);
    }, 0);
  });

  console.log(`Most callories for 1 elf: ${Math.max(...sumArray)}`);

  console.log(
    `Sum of callories for top 3 elves: ${sumArray
      .sort((a, b) => b - a)
      .splice(0, 3)
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0)}`
  );
};
