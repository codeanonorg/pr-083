export default class P83Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  static add(a, b) {
    return a.add(b);
  }

  equal(other) {
    return this.x === other.x && this.y === other.y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  add(other) {
    return new P83Vector(this.x + other.x, this.y + other.y);
  }

  addMut(other) {
    this.x += other.x;
    this.y += other.y;
  }

  scale(fac) {
    return new P83Vector(this.x * fac, this.y * fac);
  }

  scaleMut(fac) {
    this.x *= fac;
    this.y *= fac;
  }

  inRect(pos, size) {
    return this.x > pos.x && this.x < (pos.x + size.x) && this.y > pos.y && this.y < (pos.y + size.y);
  }

  copy() {
    return new P83Vector(this.x, this.y);
  }

  toString() {
    return `P83Vector(${this.x}, ${this.y})`;
  }
}

P83Vector.zero = new P83Vector(0, 0);
