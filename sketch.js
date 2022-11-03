class Graph {
  constructor(vertex, edges) {
    this.vertex = vertex;
    this.edges = edges;
    this.visited = [];
    this.stackV = this.vertex.slice();
    this.stackE = this.edges.slice();
  }

  drawVertex(mst, original) {
    current = this.stackV.shift();
    if (!mst) {
      for (let e of this.vertex) {
        if (this.visited.includes(e.name)) fill("red");
        else fill("#26b6c9");
        circle(e.x, e.y, 40);
        fill("black");
        text(e.name, e.x, e.y);
      }
      if (current) {
        if (!this.visited.includes(current.name)) {
          fill("green");
          circle(current.x, current.y, 40);
          fill("black");
          text(current.name, current.x, current.y);
        }
        this.visited.push(current.name);
      }
    } else {
      for (let e of this.vertex) {
        if (original.visited.includes(e.name)) {
          fill("#26b6c9");
          circle(e.x + 400, e.y, 40);
          fill("black");
          text(e.name, e.x + 400, e.y);
        }
      }
    }
    noFill();
  }

  drawLines(mst, original) {
    current = this.stackE.shift();
    if (!mst) {
      for (let elem of this.edges) {
        let vertexRef = this.vertex.filter(
          (el) => el.name == elem.src || el.name == elem.target
        );
        fill("black");
        line(vertexRef[0].x, vertexRef[0].y, vertexRef[1].x, vertexRef[1].y);
        text(
          elem.weight,
          (vertexRef[0].x + vertexRef[1].x) / 2,
          (vertexRef[0].y + vertexRef[1].y) / 2
        );
      }
    } else {
      for (let e of this.edges) {
        if (
          original.visited.includes(e.src) &&
          original.visited.includes(e.target)
        ) {
          let vertexRef = this.vertex.filter(
            (el) => el.name == e.src || el.name == e.target
          );
          fill("black");
          line(
            vertexRef[0].x + 400,
            vertexRef[0].y,
            vertexRef[1].x + 400,
            vertexRef[1].y
          );
          text(
            e.weight,
            (vertexRef[0].x + vertexRef[1].x) / 2 + 400,
            (vertexRef[0].y + vertexRef[1].y) / 2
          );
        }
      }
    }
    noFill();
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
function drawMSC(mst) {
  let minCost = 0;
  for (e of mst) {
    minCost += e.weight;
  }
  fill("black");
  text("Minimum Spanning Cost: " + minCost, 600, 25);
}

let mst, g, gMST, uf;
function setup() {
  createCanvas(800, 800);
  textSize(20);
  textAlign(CENTER, CENTER);
  setFrameRate(1);

  vertex = [
    new Vertex("A"),
    new Vertex("B"),
    new Vertex("C"),
    new Vertex("D"),
    new Vertex("E"),
  ];
  edges = [
    new Edge("A", "B", 2),
    new Edge("A", "C", 10),
    new Edge("C", "B", 4),
    new Edge("C", "D", 5),
    new Edge("D", "A", 7),
    new Edge("E", "B", 4),
  ];
  g = new Graph(vertex, edges);
  uf = new UnionFind(vertex);
  mst = getMST(edges, g);
  gMST = new Graph(vertex, mst);
}

let timer = 0;
function draw() {
  if (millis() >= 400 + timer) {
    background("white");
    g.drawLines(false);
    g.drawVertex(false);
    gMST.drawLines(true, g);
    gMST.drawVertex(true, g);

    drawMSC(mst);

    timer = millis();
  }
}
