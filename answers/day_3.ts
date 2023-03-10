export const runtest = (inputStr: string) => {
  const input: string[] = inputStr.split("\n").slice(0, -1);

  // Part 1
  const splitInput: string[][] = input.map((el) => {
    const middle: number = el.length / 2;
    return [el.slice(0, middle), el.slice(middle)];
  });

  const duplicates: string[] = splitInput.map((el) => {
    for (const letter of el[0]) {
      if (el[1].includes(letter)) {
        return letter;
      }
    }
    return "";
  });

  const values: number[] = duplicates.map((el) => {
    const value: number = el.charCodeAt(0);
    return value >= 97 ? value - 96 : value - 38;
  });

  const total: number = values.reduce((curr, prev) => {
    return curr + prev;
  }, 0);
  console.log(`Part 1 total: ${total}`);

  // Part 2

  const groups: string[][] = [];
  let i = 0;
  for (const el of input) {
    if (!groups[i]) groups.push([]);
    groups[i].push(el);
    if (groups[i].length === 3) {
      i++;
    }
  }
  // console.log(groups);

  const badges: string[] = groups.map((group) => {
    const shortest = group.reduce((a, b) => (a.length <= b.length ? a : b));

    for (const char of shortest) {
      if (
        group[0].includes(char) &&
        group[1].includes(char) &&
        group[2].includes(char)
      ) {
        return char;
      }
    }
    return "";
  });

  const badgeValues: number[] = badges.map((el) => {
    const value: number = el.charCodeAt(0);
    return value >= 97 ? value - 96 : value - 38;
  });

  const totalBadgeValues: number = badgeValues.reduce((curr, prev) => {
    return curr + prev;
  }, 0);
  console.log(`Part 2 total: ${totalBadgeValues}`);
};
