interface Monkey {
  items: number[];
  operation: string;
  test: number;
  true: string;
  false: string;
  inspections: number;
}

interface Monkeys {
  [key: string]: Monkey;
}

const parseInput = (inputStr: string): Monkeys => {
  const monkeys: Monkeys = {};

  const input = inputStr.split("\n\n");

  input.forEach((el) => {
    // Get Monkey #
    const monkey = el.slice(0, el.search(":\n")).replace("Monkey ", "");
    // get Description
    const description = el.slice(el.search("\n")).trim();
    // Split the description
    let parsedDescription = description.split("\n");
    parsedDescription = parsedDescription.map((el) => el.trim());
    // Temporary object to hold the description object
    const subDescriptionObj: { [key: string]: string } = {};
    // Go through each key/value description
    parsedDescription.forEach((el) => {
      const subDescription = el.split(":");
      subDescriptionObj[subDescription[0]] = subDescription[1].trim();
    });
    // Create object for the parsed monkey
    const monkeyObj: Monkey = {
      items: subDescriptionObj["Starting items"]
        .split(",")
        .map((el) => Number(el.trim())),
      operation: subDescriptionObj["Operation"]
        .slice(subDescriptionObj["Operation"].search("old"))
        .replaceAll("old", "item"),
      test: Number(subDescriptionObj["Test"].replace("divisible by ", "")),
      true: subDescriptionObj["If true"].replace("throw to monkey ", ""),
      false: subDescriptionObj["If false"].replace("throw to monkey ", ""),
      inspections: 0,
    };
    // Add monkey to list of monkeys
    monkeys[monkey] = monkeyObj;
  });

  return monkeys;
};

const monkeyRounds = (monkeys: Monkeys, mod: number): Monkeys => {
  // console.log(monkeys);
  // 20 rounds of Monkey Business
  for (let i = 1; i <= 10000; i++) {
    // console.log(monkeys);
    // Cycle through each monkey
    for (const monkey in monkeys) {
      // Cycle through each item
      for (const item of monkeys[monkey].items) {
        // new worry level
        let worry: number;
        // if (item > 9007199254740991) {
        // worry = Math.floor(eval(monkeys[monkey].operation) / 3);
        // } else {
        worry = Math.floor(eval(monkeys[monkey].operation) % mod);
        // }

        // Test to see who gets item next:
        let test = worry % monkeys[monkey].test === 0;
        if (test) {
          monkeys[monkeys[monkey].true].items.push(worry);
        } else {
          monkeys[monkeys[monkey].false].items.push(worry);
        }

        // Add inspections to monkey & clear item list
        monkeys[monkey].inspections += monkeys[monkey].items.length;
        monkeys[monkey].items = [];
      }
    }
  }
  return monkeys;
};

const getInspections = (input: Monkeys) => {
  const monkeys: (string | number)[][] = [];
  for (const monkey in input) {
    monkeys.push([monkey, input[monkey].inspections]);
  }
  return monkeys;
};

const getSuperModulo = (input: Monkeys): number => {
  const modList: number[] = [];
  for (const monkey in input) {
    modList.push(input[monkey].test);
  }
  return modList.reduce((prev, curr) => prev * curr, 1);
};

export const runtest = (input: string) => {
  const parsedInput = parseInput(input);
  // console.log(parsedInput[0]);
  const superMod = getSuperModulo(parsedInput);
  console.log({ superMod });
  const monkeysAfterRounds = monkeyRounds(parsedInput, superMod);

  const inspections = getInspections(monkeysAfterRounds);
  // console.log(inspections);

  const mostInspections = inspections
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 2)
    .reduce((prev, curr) => prev * (curr[1] as number), 1);

  console.log(
    `The sum of the number of inspections by the 2 monkeys with the most inpsections is:\n${mostInspections}`
  );
};
