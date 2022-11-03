class Vertex {
  constructor(name, x, y) {
    this.name = name;
    this.x = x || random(windowWidth / 2);
    this.y = y || random(50, windowHeight / 2);
  }
}
