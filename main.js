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

/*
#         6
#      /     \
#     7       8
#    / \     / \
#   2   7   1   3
#  /   / \       \
# 9   1   4       5
#write the java function that sum of node has grandparent, and the grandparent must be even number.
#answer of above code is 2 + 7 + 1 + 3 + 5
 */

public class Node {
  int value;
  Node left;
  Node right;

  Node(int value) {
    this.value = value;
    left = null;
    right = null;
  }
}

// method to only include grandchildren of even-valued grandparents
public int sumGrandchildrenOfEven(Node node) {
  if (node == null) {
    return 0;
  }

  int sum = 0;

  // If node value is even and node has grandchild, add grandchild's values to sum
  if (node.value % 2 == 0) {
    if (node.left != null) {
      if (node.left.left != null) {
        sum += node.left.left.value;
      }
      if (node.left.right != null) {
        sum += node.left.right.value;
      }
    }

    if (node.right != null) {
      if (node.right.left != null) {
        sum += node.right.left.value;
      }
      if (node.right.right != null) {
        sum += node.right.right.value;
      }
    }
  }

  // Recursively process left and right subtrees
  sum += sumGrandchildrenOfEven(node.left);
  sum += sumGrandchildrenOfEven(node.right);

  return sum;
}

