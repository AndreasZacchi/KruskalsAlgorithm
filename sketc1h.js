class Graph {
  constructor(vertex, edges) {
    this.vertex = vertex;
    this.edges = edges;
  }

  drawVertex(mst) {
    for (let elem of this.vertex) {
      let x = mst ? elem.x + 400 : elem.x;
      fill("#26b6c9");
      circle(x, elem.y, 40);
      fill("black");
      text(elem.name, x, elem.y);
    }
  }
  drawLines(mst) {
    for (let elem of this.edges) {
      let vertexRef = this.vertex.filter(
        (el) => el.name == elem.src || el.name == elem.target
      );
      let x1 = mst ? vertexRef[0].x + 400 : vertexRef[0].x;
      let x2 = mst ? vertexRef[1].x + 400 : vertexRef[1].x;
      let y1 = vertexRef[0].y;
      let y2 = vertexRef[1].y;
      fill("black");
      line(x1, y1, x2, y2);
      text(elem.weight, (x1 + x2) / 2, (y1 + y2) / 2);
    }
  }
}
class Vertex {
  constructor(name, x, y) {
    this.name = name;
    this.x = x || random(15, 385);
    this.y = y || random(50, 385);
  }
}
class Edge {
  constructor(src, target, weight = 1) {
    this.src = src;
    this.target = target;
    this.weight = weight;
  }
}
class UnionFind {
  constructor(elements) {
    // Number of disconnected components
    this.count = elements.length;

    // Keep Track of connected components
    this.parent = {};

    // Initialize the data structure such that all
    // elements have themselves as parents
    elements.forEach((e) => (this.parent[e.name] = e.name));
  }

  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);

    // Roots are same so these are already connected.
    if (rootA === rootB) return;

    // Always make the element with smaller root the parent.
    if (rootA < rootB) {
      if (this.parent[b] != b) this.union(this.parent[b], a);
      this.parent[b] = this.parent[a];
    } else {
      if (this.parent[a] != a) this.union(this.parent[a], b);
      this.parent[a] = this.parent[b];
    }
  }

  // Returns final parent of a node
  find(a) {
    while (this.parent[a] !== a) {
      a = this.parent[a];
    }
    return a;
  }

  // Checks connectivity of the 2 nodes
  connected(a, b) {
    return this.find(a) === this.find(b);
  }
}
function getMST(edges, graph) {
  let sortedEdges = edges.slice().sort((a, b) => a.weight - b.weight);
  let result = [];
  for (let i = 0; i < edges.length; i++) {
    current = sortedEdges.shift();
    if (!uf.connected(current.src, current.target)) {
      result.push(current);
      uf.union(current.src, current.target);
    }
  }
  return result;
}
function getMSC(mst) {
  let minCost = 0;
  for (e of mst) {
    minCost += e.weight;
  }
  return minCost;
}

let mst, g, gMST, uf;

function setup() {
  createCanvas(800, 800);
  textSize(20);
  textAlign(CENTER, CENTER);
  setFrameRate(1);

  vertex = [new Vertex("A"), new Vertex("B"), new Vertex("C"), new Vertex("D")];
  edges = [
    new Edge("A", "B", 2),
    new Edge("A", "C", 10),
    new Edge("C", "B", 4),
    new Edge("C", "D", 5),
    new Edge("D", "A", 7),
  ];
}

let timer = 0;
function draw() {
  background("white");
  noFill();

  g = new Graph(vertex, edges);
  uf = new UnionFind(vertex);
  mst = getMST(edges, g);
  gMST = new Graph(vertex, mst);

  g.drawLines(false);
  g.drawVertex(false);

  gMST.drawLines(true);
  gMST.drawVertex(true);
  text("Minimum Spanning Cost: " + getMSC(mst), 600, 25);
}
