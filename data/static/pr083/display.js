import { colors } from "./consts.js";
import Vector from "./vector.js";

export class P83Title {
  constructor(parent, pos, size, title) {
    this.parent = parent;
    this.root = this.parent.root;
    this.pos = pos;
    this.size = size;
    this.title = title;
  }

  draw() {
    const ctx = this.root.ctx;
    const unit = this.root.unit;
    const titleWidth = ctx.measureText(this.title).width;
    ctx.fillStyle = colors.light[0];
    ctx.shadowBlur = 0;
    ctx.font = "" + Math.floor(unit * 0.8) + "px 'Be Vietnam'";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(this.title, (this.pos.x + 2) * unit, (this.pos.y + 1) * unit);
    //
    ctx.lineWidth = 2;
    ctx.strokeStyle = colors.light[0];
    ctx.beginPath();
    ctx.moveTo((this.pos.x + 1.5) * unit, (this.pos.y + 1) * unit);
    ctx.lineTo((this.pos.x + 1) * unit, (this.pos.y + 1) * unit);
    ctx.lineTo((this.pos.x + 1) * unit, (this.pos.y + 2) * unit);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo((this.pos.x + 2.5) * unit + titleWidth, (this.pos.y + 1) * unit);
    ctx.lineTo((this.pos.x + this.size.x - 1) * unit, (this.pos.y + 1) * unit);
    ctx.lineTo((this.pos.x + this.size.x - 1) * unit, (this.pos.y + 2) * unit);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo((this.pos.x + 1) * unit, (this.pos.y + this.size.y - 2) * unit);
    ctx.lineTo((this.pos.x + 1) * unit, (this.pos.y + this.size.y - 1) * unit);
    ctx.lineTo((this.pos.x + this.size.x - 1) * unit, (this.pos.y + this.size.y - 1) * unit);
    ctx.lineTo((this.pos.x + this.size.x - 1) * unit, (this.pos.y + this.size.y - 2) * unit);
    ctx.stroke();
  }
}

export class P83LED {
  constructor(parent, pos) {
    this.parent = parent;
    this.root = this.parent.root;
    this.pos = pos;
    this.lit = true;
    this.blinking = false;
    this.nbTimeouts = 0;
    this.colors = colors.green;
    this.blip = document.getElementById("blip");
  }

  draw() {
    const ctx = this.root.ctx;
    const unit = this.root.unit;

    if (this.lit) {
      ctx.fillStyle = this.colors[0];
      ctx.strokeStyle = this.colors[0];
      ctx.shadowBlur = unit;
      ctx.shadowColor = this.colors[1];
    } else {
      ctx.strokeStyle = "#101010";
      ctx.fillStyle = this.colors[2];
      ctx.shadowBlur = 0;
    }

    ctx.beginPath();
    ctx.arc(unit * this.pos.x, unit * this.pos.y, unit / 3, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }

  blink(state) {
    if (!this.blinking) return;
    switch (state) {
      case 0:
        this.lit = true;
        this.parent.draw();
        break;
      case 1:
        if (this.nbTimeouts === 0) {
          this.nbTimeouts = 1;
          setTimeout(() => this.blink(2));
        }
        break;
      case 2:
        this.nbTimeouts--;
        if (this.nbTimeouts > 0) return;
        this.lit = !this.lit;
        this.parent.draw();
        if (this.lit) {
          if (this.blip) {
            this.blip.volume = 0.1;
            this.blip.play();
          }
        }
        this.nbTimeouts = 1;
        setTimeout(() => this.blink(2), 300);
        break;
    }
  }
}

export class P83Button {
  constructor(parent, pos, size, text, on_cb, off_cb) {
    this.root = parent.root;
    this.pos = pos;
    this.size = size;
    this.text = text;
    this.onCb = on_cb || noop;
    this.offCb = off_cb || noop;
    this.active = true;
    this.lit = false;
    this.audio = document.getElementById("click");
    this.colors = colors.green;
  }

  draw() {
    const ctx = this.root.ctx;
    const unit = this.root.unit;
    if (this.active) {
      if (this.lit) {
        this.colors = colors.light;
      } else {
        this.colors = colors.green;
      }
      ctx.shadowBlur = unit / 2;
      ctx.fillStyle = this.colors[2];
      ctx.strokeStyle = this.colors[0];
      ctx.shadowColor = this.colors[1];
    } else {
      ctx.strokeStyle = "#101010";
      ctx.fillStyle = this.colors[2];
      ctx.shadowBlur = 0;
    }
    ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit);
    ctx.strokeRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit);
    //
    ctx.fillStyle = "#000000";
    if (this.active) {
      ctx.fillStyle = this.colors[0];
      ctx.shadowBlur = unit / 4;
      ctx.shadowColor = this.colors[1];
    }
    ctx.font = "" + Math.floor(5 / 4 * unit) + "px 'Nova Mono'";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(this.text, (this.pos.x + this.size.x / 2) * unit, (this.pos.y + 0.5) * unit);
  }

  onClick(pos) {
    if (!this.active || this.lit) return;
    const unit = this.root.unit;
    const delta = pos.add(this.pos.scale(-unit));
    this.lit = delta.inRect(Vector.zero, this.size.scale(unit));
    if (this.lit) {
      if (this.audio) {
        this.audio.volume = 0.1;
        this.audio.play();
      }
      console.log("click");
      setTimeout(this.off.bind(this), 200);
      this.onCb.call(this);
    }
  }

  off() {
    this.lit = false;
    this.offCb.call(this);
    this.draw();
  }
}

export class P83MenuItem {
  constructor(parent, pos, text, on_cb, off_cb) {
    this.root = parent.root;
    this.pos = pos;
    this.text = text;
    this.button = new P83Button(this, pos, new Vector(1, 1), "", on_cb, off_cb);
  }

  draw() {
    const ctx = this.root.ctx;
    const unit = this.root.unit;
    const textPos = this.pos.add(new Vector(2, 0.5)).scale(unit);
    ctx.fillStyle = colors.light[0];
    ctx.shadowBlur = 0;
    ctx.textAlign = "left";
    ctx.font = `${Math.floor(unit * 0.8)}px 'Be Vietnam'`;
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, textPos.x, textPos.y);
    this.button.draw();
  }

  onClick(pos) {
    this.button.onClick(pos);
  }
}

export class P83Display {
  constructor(parent, pos, size) {
    this.parent = parent;
    this.root = this.parent.root;
    this.pos = pos;
    this.size = size;
    this.value = "";
    this.colors = colors.green;
  }

  draw() {
    const ctx = this.root.ctx;
    const unit = this.root.unit;
    ctx.shadowBlur = 0;
    ctx.fillStyle = this.colors[2];
    ctx.strokeStyle = "#101010";
    ctx.fillRect(this.pos.x * unit, this.pos.y * unit, (this.size * 0.71 + 0.5) * unit, 2 * unit);
    ctx.strokeRect(this.pos.x * unit, this.pos.y * unit, (this.size * 0.71 + 0.5) * unit, 2 * unit);
    //
    ctx.fillStyle = this.colors[0];
    ctx.shadowBlur = unit / 4;
    ctx.shadowColor = this.colors[1];
    ctx.font = `${Math.floor(5 / 4 * unit)}px 'Nova Mono'`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    let text = this.value;
    if (text.length > this.size) {
      text = this.value.substring(text.length - this.size, text.length);
    }
    ctx.fillText(text, (this.pos.x + 0.25) * unit, (this.pos.y + 0.5) * unit);
  }
}

export class P83Input {
  constructor(parent, pos, size, id, cb) {
    this.parent = parent;
    this.root = this.parent.root;
    this.pos = pos;
    this.size = size;
    this.callback = cb;
    this.colors = colors.green;
    this.input = document.getElementById(id);
    this.input.value = "";
    this.input.addEventListener("input", this.onInput.bind(this));
    this.input.addEventListener("keyup", this.onKeyup.bind(this));
    this.authorizedChars = "";
    this.popping = false;
  }

  draw() {
    const canvas = this.root.canvas;
    const unit = this.root.unit;
    this.input.style.left = "" + (canvas.offsetLeft + this.pos.x * unit) + "px";
    this.input.style.top = "" + (canvas.offsetTop + this.pos.y * unit) + "px";
    this.input.style.width = "" + (Math.floor((this.size * 0.71 + 0.5) * unit) - 2) + "px";
    this.input.style.height = "" + (2 * unit - 2) + "px";
    this.input.style.backgroundColor = colors.green[2];
    this.input.style.font = "" + Math.floor(5 / 4 * unit) + "px 'Nova Mono'";
    this.input.style.color = colors.green[0];
    this.input.style.textShadow = "0 0 " + Math.floor(unit / 4) + "px " + colors.green[1];
    this.input.style.border = "1px solid #101010";
  }

  setup(authorizedChars) {
    this.input.value = "";
    this.authorizedChars = authorizedChars;
  }

  onInput() {
    let correct = "";
    for (const char of this.input.value) {
      if (this.authorizedChars.indexOf(char) >= 0)
        correct += char;
    }
    this.input.value = correct;
  }

  onKeyup(event) {
    if (event.key === "Enter")
      if (!this.popping) this.pop();
  }

  pop() {
    this.popping = false;
    if (this.input.value.length === 0) return;
    if (this.callback(parseInt(this.input.value[0]))) {
      this.input.value = this.input.value.slice(1);
      this.popping = true;
      setTimeout(this.pop.bind(this), 100);
    }
  }

  show(shown) {
    if (shown) {
      this.input.style.visibility = "visible";
      this.input.style.zIndex = "1";
    } else {
      this.input.style.visibility = "hidden";
      this.input.style.zIndex = "-1";
    }
  }
}

export class P83Number {
  constructor(parent, pos, size) {
    this.parent = parent;
    this.root = this.parent.root;
    this.size = size;
    this.value = NaN;
    this.display = new P83Display(this, pos, size);
  }

  draw() {
    let sign = " ";
    let digits = "";
    let value = this.value;
    if (isNaN(value)) {
      this.display.value = ":-(";
    } else {
      if (value < 0) {
        sign = "-";
        value *= -1;
      }
      for (let i = 1; i < this.size; i++) {
        digits = `${value % 10}${digits}`;
        value = Math.floor(value / 10);
      }
      this.display.value = sign + digits;
    }
    this.display.draw();
  }
}

function noop() {
}
