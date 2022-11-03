class Vertex {
  constructor(name, x, y) {
    this.name = name;
    this.x = x || random(15, 385);
    this.y = y || random(50, 385);
  }
}
