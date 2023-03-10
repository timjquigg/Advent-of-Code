const transpose = (matrix: number[][]) => {
  const transposed: number[][] = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!transposed[j]) transposed.push([]);
      transposed[j][i] = matrix[i][j];
    }
  }
  return transposed;
};

const solution = (input: string[]) => {
  const strMatrix = input.map((el) => el.split(""));

  const matrix: number[][] = strMatrix.map((el) => el.map((el) => Number(el)));
  // console.log(matrix);
  const transMatrix = transpose(matrix);
  // console.log(transMatrix);
  let visible = matrix.length * 2 + matrix[0].length * 2 - 4;
  let maxScore = [];
  for (let i = 1; i < matrix.length - 1; i++) {
    for (let j = 1; j < matrix[i].length - 1; j++) {
      const rowBefore = matrix[i].slice(0, j);
      const maxRowBefore = Math.max(...rowBefore);
      // const locRowMaxBefore = rowBefore.lastIndexOf(String(maxRowBefore));
      const blockRowBefore = rowBefore
        .reverse()
        .findIndex((el) => el >= matrix[i][j]);

      const rowAfter = matrix[i].slice(j + 1);
      const maxRowAfter = Math.max(...rowAfter);
      // const locRowMaxAfter = rowAfter.indexOf(String(maxRowAfter));
      const blockRowAfter = rowAfter.findIndex((el) => el >= matrix[i][j]);

      const colBefore = transMatrix[j].slice(0, i);
      const maxColBefore = Math.max(...colBefore);
      // const locColMaxBefore = colBefore.lastIndexOf(String(maxColBefore));
      const blockColBefore = colBefore
        .reverse()
        .findIndex((el) => el >= matrix[i][j]);

      const colAfter = transMatrix[j].slice(i + 1);
      const maxColAfter = Math.max(...colAfter);
      // const locColMaxAfter = colAfter.indexOf(String(maxColAfter));
      const blockColAfter = colAfter.findIndex((el) => el >= matrix[i][j]);

      const scores = [
        Number(matrix[i][j]) > maxColBefore ? i : blockColBefore + 1,
        Number(matrix[i][j]) > maxRowBefore ? j : blockRowBefore + 1,
        Number(matrix[i][j]) > maxColAfter
          ? matrix[i].length - 1 - i
          : blockColAfter + 1,
        Number(matrix[i][j]) > maxRowAfter
          ? matrix[j].length - 1 - j
          : blockRowAfter + 1,
      ];
      maxScore.push(
        scores.reduce((acc, curr) => {
          return acc * curr;
        }, 1)
      );
      if (
        Number(matrix[i][j]) > maxRowBefore ||
        Number(matrix[i][j]) > maxRowAfter ||
        Number(matrix[i][j]) > maxColBefore ||
        Number(matrix[i][j]) > maxColAfter
      ) {
        visible++;
      }
    }
  }
  return [visible, Math.max(...maxScore)];
};

export const runtest = (inputStr: string) => {
  const input = inputStr.split("\n").slice(0, -1);

  const [visible, maxScore] = solution(input);

  console.log({ visible });
  console.log({ maxScore });
};
