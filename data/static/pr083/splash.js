import { colors } from "./consts.js";
import { P83MenuItem } from "./display.js";
import Vector from "./vector.js";

export default class P83Splash {
  constructor(parent, pos, cb) {
    this.parent = parent;
    this.root = this.parent.root;
    this.pos = pos;
    this.size = new Vector(40, 7);
    this.callback = cb || (() => {
    });
    this.text = "";
    this.menuItem = new P83MenuItem(this, Vector.add(this.pos, new Vector(2, 4)), "OK", this.draw.bind(this), this.quit.bind(this));
  }

  show(text) {
    this.text = text.toUpperCase();
    this.parent.draw();
    this.draw();
  }

  draw() {
    const ctx = this.root.ctx;
    const unit = this.root.unit;

    ctx.fillStyle = "#000000";
    ctx.strokeStyle = colors.light[0];
    ctx.shadowBlur = unit;
    ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit);
    ctx.strokeRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit);
    //
    ctx.shadowBlur = 0;
    ctx.fillStyle = colors.light[0];
    ctx.textAlign = "left";
    ctx.font = "" + Math.floor(unit * 0.8) + "px Liberation";
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, (this.pos.x + 2) * unit, (this.pos.y + 2.5) * unit);
    //
    this.menuItem.draw();
  }

  onClick(pos) {
    this.menuItem.onClick(pos);
  }

  quit() {
    this.menuItem.button.lit = false;
    this.callback();
  }
}
