import Vector from "./vector.js";
import { P83Button, P83LED, P83Number, P83Title } from "./display.js";
import { colors } from "./consts.js";

export class P83Targets {
  constructor(positions, isTrackingOk) {
    this.positions = [];
    this.checked = [];
    for (let i = 0; i < positions.length; i += 2) {
      this.positions.push(new Vector(positions[i], positions[i + 1]));
      this.checked.push(false);
    }
    this.isTrackingOk = isTrackingOk;
  }

  get nbChecked() {
    return this.checked.filter(Boolean).length;
  }

  check(probe) {
    let checkState = P83Targets.CHECK_STATE_POSITION;
    for (let i = 0; i < this.positions.length; i++) {
      const position = this.positions[i];
      if (position.equal(probe.position)) {
        if (this.isTrackingOk || probe.isMotionless()) {
          checkState = P83Targets.CHECK_STATE_BOTH;
          if (!this.checked[i]) {
            this.checked[i] = true;
          }
        }
      }
    }
    return checkState;
  }

  checkAll() {
    return this.nbChecked === this.checked.length;
  }

  targetsString() {
    const a_code = 'A'.charCodeAt(0);
    return this.positions.map((p, i) => ` ${String.fromCharCode(a_code + i)}: (${p.toString()})`).join('\n');
  }

  checkedString() {
    const a_code = 'A'.charCodeAt(0);
    return this.checked.map((b, i) => ([b, i])).filter(([b, _]) => b).map(([b, i]) => String.fromCharCode(a_code + i)).join(" ");
  }
}

P83Targets.CHECK_STATE_POSITION = Symbol();
P83Targets.CHECK_STATE_BOTH = Symbol();
P83Targets.CHECK_STATE_NONE = Symbol();

export class P83TargetSelector {
  constructor(parent, pos, mission, callback) {
    this.parent = parent;
    this.root = this.parent.root;
    this.pos = pos;
    this.size = new Vector(14, 21);
    this.mission = mission;
    this.callback = callback;
    this.title = new P83Title(this, this.pos, this.size, "TARGET SELECTOR");
    this.led = new P83LED(this, Vector.add(this.pos, new Vector(2.5, 17.5)), 8);
    this.numX = new P83Number(this, Vector.add(this.pos, new Vector(6, 15.5)), 8);
    this.numY = new P83Number(this, Vector.add(this.pos, new Vector(6, 17.5)), 8);
    this.buttons = [];
    for (let i = 0; i < 20; i++) {
      this.buttons.push(
        new P83Button(
          this,
          Vector.add(
            this.pos,
            new Vector(
              2 + 8 / 3 * (i % 4),
              2 + 8 / 3 * Math.floor(i / 4)
            )
          ),
          new Vector(2, 2),
          String.fromCharCode('A'.charCodeAt(0) + i),
          this.select.bind(this, i),
          () => {
          }
        )
      );
    }
  }

  draw() {
    const ctx = this.root.ctx;
    const unit = this.root.unit;

    ctx.fillStyle = "#000000";
    ctx.shadowBlur = 0;
    ctx.fillRect(this.x * unit, this.y * unit, this.w * unit, this.h * unit);
    //
    this.title.draw();
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].draw();
    }
    this.led.draw();
    //
    ctx.fillStyle = colors.light[0];
    ctx.shadowBlur = 0;
    ctx.textAlign = "left";
    ctx.font = "" + Math.floor(unit * 0.8) + "px Liberation";
    ctx.textBaseline = "middle";
    ctx.fillText("X", (this.x + 4) * unit, (this.y + 16.5) * unit);
    ctx.fillText("Y", (this.x + 4) * unit, (this.y + 18.5) * unit);

    this.numX.draw();
    this.numY.draw();
  }

  select(idx) {
    for (let i = 0; i < this.mission.nbTargets; i++) {
      this.buttons[i].lit = i === idx;
    }
    this.selected = idx;
    this.callback(idx);
    this.numX.value = this.mission.targets.positions[idx].x;
    this.numY.value = this.mission.targets.positions[idx].y;
    this.draw();
  }

  onClick(pos) {
    for (const button of this.buttons) button.onClick(pos);
  }
}
