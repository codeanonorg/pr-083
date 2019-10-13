import Vector from "./vector.js";
import { P83Button, P83Display, P83Input, P83LED, P83MenuItem, P83Number, P83Title } from "./display.js";
import { colors } from "./consts.js";

export class P83XYPanel {
  constructor(parent, pos, title, vector) {
    this.parent = parent;
    this.root = this.parent.root;
    this.pos = pos;
    this.size = new Vector(14, 7);
    this.title = new P83Title(this, this.pos, this.size, title);
    this.vector = vector;
    this.led = new P83LED(this, this.pos, this.size, title);
    this.numX = new P83Number(this, Vector.add(this.pos, new Vector(6, 1.5)), 8);
    this.numY = new P83Number(this, Vector.add(this.pos, new Vector(6, 3.5)), 8)
  }

  draw() {
    const ctx = this.root.ctx;
    const unit = this.root.unit;

    ctx.fillStyle = "#000000";
    ctx.shadowBlur = 0;
    ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit);
    //
    this.title.draw();
    this.led.draw();
    //
    ctx.fillStyle = colors.light[0];
    ctx.shadowBlur = 0;
    ctx.textAlign = "left";
    ctx.font = "" + Math.floor(unit * 0.8) + "px Liberation";
    ctx.textBaseline = "middle";
    ctx.fillText("X", (this.pos.x + 4) * unit, (this.pos.y + 2.5) * unit);
    ctx.fillText("Y", (this.pos.x + 4) * unit, (this.pos.y + 4.5) * unit);
    //
    this.numX.value = this.vector.x;
    this.numY.value = this.vector.y;
    //
    this.numX.draw();
    this.numY.draw();
  }
}


export default class P83StatusPanel {
  constructor(parent, pos, mission) {
    this.parent = parent;
    this.root = this.parent.root;
    this.pos = pos;
    this.size = new Vector(14, 7);
    this.mission = mission;
    this.title = new P83Title(this, this.pos, this.size, "STATUS");
    this.oxygenLED = new P83LED(this, new Vector(this.pos.x + 2.5, this.pos.y + 2.5));
    this.oxygenNum = new P83Number(this, new Vector(this.pos.x + 8, this.pos.y + 1.5), 5);
    this.trackingLED = new P83LED(this, new Vector(this.pos.x + 2.5, this.pos.y + 4.5));
  }

  draw() {
    const ctx = this.root.ctx;
    const unit = this.root.unit;

    ctx.fillStyle = "#000000";
    ctx.shadowBlur = 0;
    ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit);
    //
    this.title.draw();
    //
    ctx.fillStyle = colors.light[0];
    ctx.shadowBlur = 0;
    ctx.textAlign = "left";
    ctx.font = "" + Math.floor(unit * 0.8) + "px Liberation";
    ctx.textBaseline = "middle";
    ctx.fillText("OXYGEN", (this.pos.x + 4) * unit, (this.pos.y + 2.5) * unit);
    ctx.fillText("TRACKING DEVICE", (this.pos.x + 4) * unit, (this.pos.y + 4.5) * unit);
    //
    if (this.mission.oxygenLevel > 1) {
      this.oxygenLED.colors = colors.green;
    } else {
      this.oxygenLED.colors = colors.red;
    }
    this.oxygenNum.value = this.mission.oxygenLevel;
    if (this.mission.trackingAllowed) {
      this.trackingLED.colors = colors.green;
    } else {
      this.trackingLED.colors = colors.red;
    }

    this.oxygenNum.draw();
    this.oxygenLED.draw();
    this.trackingLED.draw();
  }
}


export class P83ThrustPanel {
  constructor(parent, pos, mission, move_cb) {
    this.parent = parent;
    this.root = this.parent.root;
    this.pos = pos;
    this.size = new Vector(14, 14);
    this.mission = mission;
    this.move_callback = move_cb;
    this.title = new P83Title(this, this.pos, this.size, "THRUST");
    this.diagonalAllowed = true;
    this.buttons = [];
    for (let i = 0; i < 9; i++) {
      const pos = this.pos.copy();
      pos.add(3.5 + 2.5 * (i % 3), 8.5 - 2.5 * Math.floor(i / 3));
      const size = new Vector(2, 2);
      this.buttons.push(new P83Button(this, pos, size, `${i + 1}`, this.move_callback.bind(this, i + 1)))
    }

    if (this.mission.diagonalAllowed)
      for (const button of this.buttons) {
        button.active = true;
      }
    else
      for (let i = 0; i < 9; i++) {
        this.buttons[i].active = i !== 4 && i % 2 === 0;
      }
  }

  clear() {
    for (const button of this.buttons) button.lit = false;
    this.draw();
  }

  drawArrow(pos1, pos2, pos3) {
    const ctx = this.root.ctx;
    const unit = this.root.unit;
    ctx.strokeStyle = colors.light[0];
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(pos1.x * unit, pos1.y * unit);
    ctx.lineTo(pos2.x * unit, pos2.y * unit);
    ctx.lineTo(pos3.x * unit, pos3.y * unit);
    ctx.stroke();
  }

  draw() {
    const ctx = this.root.ctx;
    const unit = this.root.unit;

    ctx.fillStyle = "#000000";
    ctx.shadowBlur = 0;
    ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit);
    //
    this.title.draw();
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].draw();
    }

    this.drawArrow(
      Vector.add(this.pos, new Vector(3, 9.5)),
      Vector.add(this.pos, new Vector(3, 11)),
      Vector.add(this.pos, new Vector(4.5, 11))
    );
    this.drawArrow(
      Vector.add(this.pos, new Vector(6, 11)),
      Vector.add(this.pos, new Vector(7, 12)),
      Vector.add(this.pos, new Vector(8, 11))
    );
    this.drawArrow(
      Vector.add(this.pos, new Vector(11, 9.5)),
      Vector.add(this.pos, new Vector(11, 11)),
      Vector.add(this.pos, new Vector(9.5, 11))
    );
    this.drawArrow(
      Vector.add(this.pos, new Vector(11, 6)),
      Vector.add(this.pos, new Vector(12, 7)),
      Vector.add(this.pos, new Vector(11, 8))
    );
    this.drawArrow(
      Vector.add(this.pos, new Vector(11, 4.5)),
      Vector.add(this.pos, new Vector(11, 3)),
      Vector.add(this.pos, new Vector(9.5, 3))
    );
    this.drawArrow(
      Vector.add(this.pos, new Vector(6, 3)),
      Vector.add(this.pos, new Vector(7, 2)),
      Vector.add(this.pos, new Vector(8, 3))
    );
    this.drawArrow(
      Vector.add(this.pos, new Vector(3, 4.5)),
      Vector.add(this.pos, new Vector(3, 3)),
      Vector.add(this.pos, new Vector(4.5, 3))
    );
    this.drawArrow(
      Vector.add(this.pos, new Vector(3, 6)),
      Vector.add(this.pos, new Vector(2, 7)),
      Vector.add(this.pos, new Vector(3, 8))
    );
  }

  onClick(pos) {
    for (const button of this.buttons) {
      button.onClick(pos);
    }
  }
}

export class P83SequencePanel {
  constructor(parent, pos, mission, callback) {
    this.parent = parent;
    this.root = this.parent.root;
    this.mission = mission;
    this.pos = pos;
    this.size = new Vector(42, 7);
    this.title = new P83Title(this, this.pos, this.size, "THRUST SEQUENCE");
    this.sequence = new P83Display(this, Vector.add(this.pos, new Vector(9.75, 1.5)), 42);
    this.sequenceInput = new P83Input(this, Vector.add(this.pos, new Vector(9.75, 3.5)), 42, "input", callback);

    if (this.mission.diagonalAllowed)
      this.sequenceInput.setup("123456789");
    else this.sequenceInput.setup("24568");
  }

  draw() {
    const ctx = this.root.ctx;
    const unit = this.root.unit;

    this.sequenceInput.show(true);
    ctx.fillStyle = "#000000";
    ctx.shadowBlur = 0;
    ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit);
    //
    this.title.draw();
    //
    ctx.fillStyle = colors.light[0];
    ctx.shadowBlur = 0;
    ctx.textAlign = "left";
    ctx.font = "" + Math.floor(unit * 0.8) + "px Liberation";
    ctx.textBaseline = "middle";
    ctx.fillText("SEQUENCE", (this.pos.x + 2) * unit, (this.pos.y + 2.5) * unit);
    ctx.fillText("KEYBOARD INPUT", (this.pos.x + 2) * unit, (this.pos.y + 4.5) * unit);
    //
    this.sequence.value = this.mission.sequence;
    this.sequence.draw();
    this.sequenceInput.draw();
  }
}

export class P83MissionPanel {
  constructor(parent, pos, mission, quit_cb) {
    this.parent = parent;
    this.root = this.parent.root;
    this.pos = pos;
    this.size = new Vector(14, 7);
    this.mission = mission;
    this.quitCallback = quit_cb;
    this.title = new P83Title(this, this.pos, this.size, "MISSION");
    this.printMenuItem = new P83MenuItem(this, Vector.add(this.pos, new Vector(2, 2)), "PRINT", this.draw.bind(this), this.print.bind(this));
    this.quitMenuItem = new P83MenuItem(this, Vector.add(this.pos, new Vector(2, 4)), "QUIT", this.draw.bind(this), this.quit.bind(this));
  }

  print() {
    this.printMenuItem.lit = false;
    this.draw();
    window.open("data:text," + encodeURI(this.mission.toString()), "_blank");
  }

  draw() {
    const ctx = this.root.ctx;
    const unit = this.root.unit;

    ctx.fillStyle = "#000";
    ctx.shadowBlur = 0;
    ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit);

    this.title.draw();

    this.printMenuItem.draw();
    this.quitMenuItem.draw();
  }

  onClick(pos) {
    this.printMenuItem.onClick(pos);
    this.quitMenuItem.onClick(pos);
  }

  quit() {
    this.quitMenuItem.lit = false;
    this.draw();
    this.quitCallback();
  }
}
