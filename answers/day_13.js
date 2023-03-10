const flatten = (arr) => {
  const flat = [];
  for (const el of arr) {
    if (Array.isArray(el)) {
      flat.push(...flatten(el));
    }
    if (typeof el === "number") flat.push(el);
  }
  return flat;
};

const compareArrays = (arr1, arr2) => {
  const flat1 = flatten(arr1);
  const flat2 = flatten(arr2);
  for (const i in flat1) {
    if (flat1[i] > flat2[i]) {
      return false;
    }
  }
  if (arr1.length > arr2.length) {
    return false;
  }

  if (typeof flat1[0] === 'undefined' && typeof flat2[0] === 'undefined') {
    if (JSON.stringify(arr1).length > JSON.stringify(arr2).length) {
      return false;
    }
  }

  return true;
};

const runtest = (input) => {
/*
  input = `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;
 */
  console.log(input);
  // input = input.split('\n\n').map(el => el.split('\n'));
  input = input.trim().split('\n\n').map(el => el.split('\n')).map(el => JSON.parse("[" + el + "]"));
  console.log(input);
  const inOrder = [];
  input.filter((el, i) => {
    if (compareArrays(el[0], el[1])) {
      inOrder.push(i + 1);
    }
  });
  const sum = inOrder.reduce((prev, curr) => prev + curr, 0);

  console.log(sum);
};

module.exports = {runtest};