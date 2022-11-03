let g, gMST, uf;
function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(10);
  textAlign(CENTER, CENTER);

  vertexAmount = 50;
  edgesAmount = 2 * vertexAmount;
  vertex = [];
  edges = [];
  for (let i = 0; i < vertexAmount; i++) {
    vertex.push(new Vertex(i));
  }
  for (let i = 0; i < edgesAmount; i++) {
    let v1 = random(vertex);
    let v2 = random(vertex);

    while (v1 == v2) {
      v2 = random(vertex);
    }

    let check = edges.filter(
      (edge) =>
        (edge.src === v1 && edge.target === v2) ||
        (edge.target === v1 && edge.src === v2)
    );
    if (typeof check !== "undefined" && check.length === 0) {
      edges.push(new Edge(v1, v2, int(random(80))));
    }
  }

  g = new Graph(vertex, edges);
}

let timer = 0;
function draw() {
  if (millis() >= 400 + timer) {
    background("white");
    g.draw();
    g.drawMST();
    g.drawMSC();

    timer = millis();
  }
}
