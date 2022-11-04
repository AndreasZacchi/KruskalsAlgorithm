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
      circle(value.src.x, value.src.y, 20);
      circle(value.target.x, value.target.y, 20);
      fill("black");
      text(value.src.name, value.src.x, value.src.y);
      text(value.target.name, value.target.x, value.target.y);
      text(
        value.weight,
        (value.src.x + value.target.x) / 2,
        (value.src.y + value.target.y) / 2
      );
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
        circle(srcX, srcY, 20);
        circle(tgtX, tgtY, 20);
        fill("black");
        text(this.mst[i].src.name, srcX, srcY);
        text(this.mst[i].target.name, tgtX, tgtY);
        text(this.mst[i].weight, (srcX + tgtX) / 2, (srcY + tgtY) / 2);
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
      "Minimum Spanning Cost: " + minCost,
      windowWidth - windowWidth / 2,
      25
    );
  }
}
