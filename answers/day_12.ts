const buildGraph = (input: string[]) => {
  const graph = {};
  const start = [];
  const finish = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const position = JSON.stringify([i, j]);
      graph[position] = {};
      const adjacents = [];
      let currentValue = input[i][j].charCodeAt(0);

      if (input[i][j] === "S") {
        start.push(i, j);
        currentValue = 97;
      }

      if (input[i][j] === "E") {
        finish.push(i, j);
        currentValue = 122;
      }

      if (i > 0) {
        adjacents.push([input[i - 1][j], [i - 1, j]]);
      }

      if (j < input[i].length - 1) {
        adjacents.push([input[i][j + 1], [i, j + 1]]);
      }

      if (i < input.length - 1) {
        adjacents.push([input[i + 1][j], [i + 1, j]]);
      }

      if (j > 0) {
        adjacents.push([input[i][j - 1], [i, j - 1]]);
      }
      adjacents
        .filter((el) => {
          return Math.abs(el[0].charCodeAt(0) - currentValue) <= 1;
        })
        .forEach((el) => {
          graph[position][JSON.stringify(el[1])] = 1;
        });
    }
  }
  console.log(graph, start, finish);

  return [graph, JSON.stringify(start), JSON.stringify(finish)];
};

const shortestDistanceNode = (distances, visited) => {
  // create a default value for shortest
  let shortest = null;

  // for each node in the distances object
  for (let node in distances) {
    // if no node has been assigned to shortest yet
    // or if the current node's distance is smaller than the current shortest
    let currentIsShortest =
      shortest === null || distances[node] < distances[shortest];
    // and if the current node is in the unvisited set
    if (currentIsShortest && !visited.includes(node)) {
      // update shortest to be the current node
      shortest = node;
    }
  }
  return shortest;
};

const findShortestPath = (graph, startNode, endNode) => {
  // track distances from the start node using a hash object
  let distances = {};
  distances[endNode] = Infinity;
  distances = Object.assign(distances, graph[startNode]);
  // track paths using a hash object
  let parents = {};
  parents[endNode] = null;
  for (let child in graph[startNode]) {
    parents[child] = startNode;
  }
  // collect visited nodes
  let visited = [];
  // find the nearest node
  let node = shortestDistanceNode(distances, visited);
  // for that node:
  while (node) {
    // find its distance from the start node & its child nodes
    let distance = distances[node];
    let children = graph[node];
    // console.log({node});
    // console.log(graph[node]);
    // for each of those child nodes:
    for (let child in children) {
      // make sure each child node is not the start node
      if (String(child) === String(startNode)) {
        continue;
      } else {
        // save the distance from the start node to the child node
        let newdistance = distance + children[child];
        // console.log(newdistance);
        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        // console.log('node in IF', node);
        console.log(newdistance);
        // console.log(distances[child]);
        if (!distances[child] || distances[child] > newdistance) {
          // console.log('node in 2nd IF', node);
          // save the distance to the object
          distances[child] = newdistance;
          // console.log(distances);
          // record the path
          parents[child] = node;
        }
      }
    }
    // move the current node to the visited set
    visited.push(node);
    // move to the nearest neighbor node
    node = shortestDistanceNode(distances, visited);
  }

  // using the stored paths from start node to end node
  // record the shortest path
  let shortestPath = [endNode];
  let parent = parents[endNode];
  // console.log(parents);
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();
  // console.log(distances);
  //this is the shortest path
  let results = {
    distance: distances[endNode],
    path: shortestPath,
  };
  // return the shortest path & the end node's distance from the start node
  return results;
};

export const runtest = (inputStr: string) => {
  /*
  input = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`.split('\n').slice(1,-1).map(el => el.split(''));
 */
  const input = inputStr
    .split("\n")
    .slice(0, -1)
    .map((el) => el.split(""));
  console.log(input);
  // buildGraph(input);
  const [graph, startNode, endNode] = buildGraph(input);
  const results = findShortestPath(graph, startNode, endNode);
  console.log(results);
};
