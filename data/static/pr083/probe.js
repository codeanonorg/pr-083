import Vector from "./vector.js";

export default class P83Probe {
  constructor() {
    this.position = new Vector(0, 0);
    this.speed = new Vector(0, 0);
  }

  accelerate(thrust_id) {
    const acc = new Vector((thrust_id - 1) % 3 - 1, Math.floor((thrust_id - 1) / 3) - 1);
    this.speed.addMut(acc);
    this.position.addMut(this.speed);
  }

  isMotionless() {
    return this.speed.equal(Vector.zero);
  }

  toString() {
    return `SPEED: ${this.speed.toString()}\nPOSITION: ${this.position.toString()}`;
  }
}
