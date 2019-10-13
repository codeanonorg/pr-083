import { colors } from "./consts.js";

export default class P83Scope {
  constructor(parent, pos, size, mission) {
    this.parent = parent;
    this.root = this.parent.root;
    this.pos = pos;
    this.size = size;
    this.mission = mission;
    this.selected = 0;
    this.colors = colors.light;
  }

  computeDimensions() {
    const positions = [...this.mission.targets.positions, this.mission.probe.position];
    console.log(positions);
    const xPositions = positions.map(p => p.x);
    this.min_x = Math.min(...xPositions);
    this.max_x = Math.max(...xPositions);
    const yPositions = positions.map(p => p.y);
    this.min_y = Math.min(...yPositions);
    this.max_y = Math.max(...yPositions);

    const scale = Math.max(1, (this.max_x - this.min_x) / (this.size.x - 4), (this.max_y - this.min_y) / (this.size.y - 4));
    const cx = (this.max_x + this.min_x) / 2;
    const cy = (this.max_y + this.min_y) / 2;
    this.min_x = cx - scale * (this.size.x - 2) / 2;
    this.max_x = cx + scale * (this.size.x - 2) / 2;
    this.min_y = cy - scale * (this.size.y - 2) / 2;
    this.max_y = cy + scale * (this.size.y - 2) / 2;
  }

  drawGrid(size) {
    const ctx = this.root.ctx;
    const unit = this.root.unit;
    const intensity = Math.min(1, ((this.size.x - 2) / (this.max_x - this.min_x) / 10 * size));
    const color = `rgba(128, 255, 128, ${intensity})`;

    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 4 * intensity;
    let tick_x = Math.ceil(this.min_x / size) * size;
    while (tick_x < Math.ceil(this.max_x / size) * size) {
      const x = this.pos.x + 1 + (tick_x - this.min_x) / (this.max_x - this.min_x) * (this.size.x - 2);
      ctx.beginPath();
      ctx.moveTo(x * unit, (this.pos.y + 1) * unit);
      ctx.lineTo(x * unit, (this.pos.y + this.size.y - 1) * unit);
      ctx.stroke();
      tick_x += size;
    }
    let tick_y = Math.ceil(this.min_y / size) * size;
    while (tick_y < Math.ceil(this.max_y / size) * size) {
      const y = this.pos.y + 1 + (this.max_y - tick_y) / (this.max_y - this.min_y) * (this.size.y - 2);
      ctx.beginPath();
      ctx.moveTo((this.pos.x + 1) * unit, y * unit);
      ctx.lineTo((this.pos.x + this.size.x - 1) * unit, y * unit);
      ctx.stroke();
      tick_y += size;
    }
  }

  drawFullGrids() {
    const ctx = this.root.ctx;
    const unit = this.root.unit;
    ctx.shadowBlur = 0;
    ctx.fillStyle = this.colors[2];
    ctx.fillRect(this.pos.x * unit, this.pos.y * unit, this.size.x * unit, this.size.y * unit);
    ctx.lineWidth = 0;
    ctx.strokeStyle = this.colors[0];
    ctx.shadowBlur = unit / 4;
    ctx.shadowColor = this.colors[1];
    ctx.strokeRect((this.pos.x + 1) * unit, (this.pos.y + 1) * unit, (this.size.x - 2) * unit, (this.size.y - 2) * unit);
    //
    var primary_size = Math.pow(10, Math.ceil(Math.log10((this.max_x - this.min_x) / (this.size.x - 2) * 10)));
    primary_size = Math.max(100, primary_size);
    this.drawGrid(primary_size / 100);
    this.drawGrid(primary_size / 10);
    this.drawGrid(primary_size);
  }

  drawElement(pos, isProbe, isSelected, isChecked) {
    const ctx = this.root.ctx;
    const unit = this.root.unit;
    const x = this.pos.x + 1 + (pos.x - this.min_x) / (this.max_x - this.min_x) * (this.size.x - 2);
    const y = this.pos.y + 1 + (this.max_y - pos.y) / (this.max_y - this.min_y) * (this.size.y - 2);
    if (isSelected) {
      ctx.strokeStyle = colors.green[0];
      ctx.fillStyle = colors.green[0];
    } else {
      ctx.strokeStyle = colors.light[0];
      ctx.fillStyle = colors.light[0];
    }
    if (isProbe) {
      ctx.beginPath();
      ctx.moveTo((x + 0.7) * unit, y * unit);
      ctx.lineTo((x + 0.5) * unit, (y + 0.2) * unit);
      ctx.lineTo((x + 0.5) * unit, (y + 0.5) * unit);
      ctx.lineTo((x + 0.2) * unit, (y + 0.5) * unit);
      ctx.lineTo(x * unit, (y + 0.7) * unit);
      ctx.lineTo((x - 0.2) * unit, (y + 0.5) * unit);
      ctx.lineTo((x - 0.5) * unit, (y + 0.5) * unit);
      ctx.lineTo((x - 0.5) * unit, (y + 0.2) * unit);
      ctx.lineTo((x - 0.7) * unit, y * unit);
      ctx.lineTo((x - 0.5) * unit, (y - 0.2) * unit);
      ctx.lineTo((x - 0.5) * unit, (y - 0.5) * unit);
      ctx.lineTo((x - 0.2) * unit, (y - 0.5) * unit);
      ctx.lineTo(x * unit, (y - 0.7) * unit);
      ctx.lineTo((x + 0.2) * unit, (y - 0.5) * unit);
      ctx.lineTo((x + 0.5) * unit, (y - 0.5) * unit);
      ctx.lineTo((x + 0.5) * unit, (y - 0.2) * unit);
      ctx.closePath();
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x * unit, y * unit, unit / 3, 0, 2 * Math.PI, false);
      ctx.stroke();
      if (isSelected) ctx.fill();
      if (isChecked) {
        ctx.beginPath();
        ctx.arc(x * unit, y * unit, unit / 2, 0, 2 * Math.PI, false);
        ctx.stroke();
      }
    }
  }

  drawProbe() {
    this.drawElement(this.mission.probe.position, true, false, false);
  }

  drawTargets() {
    this.mission.targets.positions.forEach((tgt, i) => {
      this.drawElement(tgt, false, i === this.selected, this.mission.targets.checked[i])
    });
  }

  draw() {
    this.computeDimensions();
    this.drawFullGrids();
    this.drawProbe();
    this.drawTargets();
  }

  select(idx) {
    this.selected = idx;
    this.draw();
  }
}
