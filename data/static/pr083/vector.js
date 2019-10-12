export default class P83Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static add(a, b) {
    return new P83Vector(a.x + b.x, a.y + b.y);
  }

  equal(other) {
    return this.x === other.x && this.y === other.y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    this.x += other.x;
    this.y += other.y;
  }

  copy() {
    return new P83Vector(this.x, this.y);
  }

  toString() {
    return `P83Vector(${this.x}, ${this.y})`;
  }
}

P83Vector.zero = new P83Vector(0, 0);
