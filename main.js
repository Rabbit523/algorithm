/*
    @param {number} n
    @param {number} m
    @return {number[][]}
*/
function GenMatrix(n, m) {
  let matrix = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < m; j++) {
      row.push(Math.floor(Math.random() * 101));
    }
    matrix.push(row);
  }
  return matrix;
}

function main(n, m, start_x, start_y) {
  const matrix = GenMatrix(n, m);

  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let memo = new Map();

  /*
    @param {number} i
    @param {number} j
    @return {number[][]} path - array of coordinates
  */
  function DFS(i, j) {
    let next_max = [];

    if (memo.has(`${i},${j}`)) {
      return memo.get(`${i},${j}`);
    }

    for (let direction of directions) {
      let next_i = i + direction[0];
      let next_j = j + direction[1];
      if (
        next_i >= 0 &&
        next_i < matrix.length &&
        next_j >= 0 &&
        next_j < matrix[0].length &&
        matrix[next_i][next_j] > matrix[i][j]
      ) {
        next_max = DFS(next_i, next_j).length > next_max.length ? DFS(next_i, next_j) : next_max;
      }
    }

    const max_path = [[i, j], ...next_max];
    memo.set(`${i},${j}`, max_path);

    return max_path;
  }

  let maxPath = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let tmp = DFS(i, j);
      maxPath = tmp.length > maxPath.length ? tmp : maxPath;
    }
  }

  return maxPath.map((v) => {
    return {
      coordinate: v,
      value: matrix[v[0]][v[1]],
    };
  });
}

console.log("\nMax length = ", main(1000, 1000));
