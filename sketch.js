let g, gMST, uf;
function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  vertexAmount = 6;
  edgesAmount = 1.5 * vertexAmount;
  vertex = [];
  edges = [];
  // for (let i = 0; i < vertexAmount; i++) {
  //   vertex.push(new Vertex(makeID(2)));
  // }
  // for (let i = 0; i < edgesAmount; i++) {
  //   let v1 = random(vertex);
  //   let v2 = random(vertex);

  //   while (v1 == v2) {
  //     v2 = random(vertex);
  //   }

  //   let check = edges.filter(
  //     (edge) =>
  //       (edge.src === v1 && edge.target === v2) ||
  //       (edge.target === v1 && edge.src === v2)
  //   );
  //   if (typeof check !== "undefined" && check.length === 0) {
  //     edges.push(new Edge(v1, v2, int(random(1,20))));
  //   }
  // }
  tv = new Vertex("TV", 40, 500);
  rp = new Vertex("RP", 50, 400);
  nh = new Vertex("NH", 300, 325);
  rt = new Vertex("RT", 180, 230);
  ab = new Vertex("AB", 325, 250);
  lh = new Vertex("DLH", 350, 100);

  vertex.push(tv);
  vertex.push(rp);
  vertex.push(nh);
  vertex.push(rt);
  vertex.push(ab);
  vertex.push(lh);

  edges.push(new Edge(tv, rp, 280));
  edges.push(new Edge(tv, nh, 1600));
  edges.push(new Edge(tv, rt, 1100));
  edges.push(new Edge(tv, ab, 2100));
  edges.push(new Edge(tv, lh, 3100));

  edges.push(new Edge(rp, nh, 1700));
  edges.push(new Edge(rp, rt, 850));
  edges.push(new Edge(rp, ab, 2100));
  edges.push(new Edge(rp, lh, 3000));

  edges.push(new Edge(nh, rt, 1100));
  edges.push(new Edge(nh, ab, 600));
  edges.push(new Edge(nh, lh, 1700));

  edges.push(new Edge(rt, ab, 1500));
  edges.push(new Edge(rt, lh, 2500));

  edges.push(new Edge(ab, lh, 110));

  g = new Graph(vertex, edges);
}

let timer = 0;
function draw() {
  if (millis() >= 400 + timer) {
    background("white");
    textSize(10);
    g.draw();
    g.drawMST();
    textSize(25);
    g.drawMSC();

    timer = millis();
  }
}
