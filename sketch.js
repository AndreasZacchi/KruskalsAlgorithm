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
