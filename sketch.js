let g, gMST, uf;
function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(10);
  textAlign(CENTER, CENTER);
  setFrameRate(1);

  vertexAmount = 10;
  nodeAmount = 2 * vertexAmount;
  vertex = [];
  edges = [];
  for (let i = 0; i < vertexAmount; i++) {
    vertex.push(new Vertex(i));
  }
  for (let i = 0; i < vertexAmount; i++) {
    edges.push(new Edge(random(vertex), random(vertex), int(random(80))));
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
