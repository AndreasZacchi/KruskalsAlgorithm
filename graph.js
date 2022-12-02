class Graph {
  constructor(vertex, edges) {
    this.vertex = vertex;
    this.edges = edges;
    this.mst = calcMST(vertex, edges);
    this.stackE = this.mst.slice();
    this.visited = [];
  }

  draw() {
    for (let value of this.edges) {
      line(value.src.x, value.src.y, value.target.x, value.target.y);
      fill(96, 215, 215);
      circle(value.src.x, value.src.y, 30);
      circle(value.target.x, value.target.y, 30);
      fill("black");
      text(value.src.name, value.src.x, value.src.y);
      text(value.target.name, value.target.x, value.target.y);
      textSize(16);
      text(
        value.weight / 1000,
        (value.src.x + value.target.x) / 2,
        (value.src.y + value.target.y) / 2
      );
      textSize(12);
    }
    noFill();
  }

  drawMST() {
    current = this.stackE.pop();
    for (let i = 0; i < this.visited.length; i++) {
      if (this.visited.includes(this.mst[i].src + this.mst[i].target)) {
        let srcX = this.mst[i].src.x + windowWidth / 2;
        let srcY = this.mst[i].src.y;
        let tgtX = this.mst[i].target.x + windowWidth / 2;
        let tgtY = this.mst[i].target.y;
        line(srcX, srcY, tgtX, tgtY);
        fill(96, 215, 215);
        circle(srcX, srcY, 30);
        circle(tgtX, tgtY, 30);
        fill("black");
        text(this.mst[i].src.name, srcX, srcY);
        text(this.mst[i].target.name, tgtX, tgtY);
        textSize(16);
        text(this.mst[i].weight / 1000, (srcX + tgtX) / 2, (srcY + tgtY) / 2);
        textSize(12);
      }
    }
    if (current) this.visited.push(current.src + current.target);

    noFill();
  }
  drawMSC() {
    let minCost = 0;
    for (let e of this.mst) {
      minCost += e.weight;
    }
    fill("black");
    text(
      "Minimum Spanning Cost: " + minCost / 1000 + " km",
      windowWidth - windowWidth / 2.5,
      25
    );
  }
}
