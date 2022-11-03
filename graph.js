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
