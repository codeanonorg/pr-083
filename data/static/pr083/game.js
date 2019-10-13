import P83Controller from "./controller.js";
import Vector from "./vector.js";

export default class P83Game {
  constructor(canvasId, dataId) {
    const data = JSON.parse(document.getElementById(dataId).innerText);
    console.log({ data });
    this.root = this;
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.state = P83Game.GAME_STATE_MISSION;
    this.controller = new P83Controller(this, data, done => {
      if (!done) return;
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      fetch(window.location.pathname, {
        method: "POST",
        body: JSON.stringify({
          sequence: this.controller.mission.sequence,
          user: data.user,
          level: data.level
        }),
        headers
      }).then(r => {
        if (r.status === 200) window.location.pathname = "/";
        else {
          this.controller.splash.setup("Sequence has not been verified!");
          this.controller.splash.draw();
        }
      }).catch(e => {
        this.controller.splash.setup(`Error: ${e}`);
        this.controller.splash.draw();
      })
    });

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
    this.canvas.addEventListener("click", e => {
      const x = e.pageX - this.canvas.offsetLeft;
      const y = e.pageY - this.canvas.offsetTop;
      this.controller.onClick(new Vector(x, y));
    })
  }

  draw() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.controller.draw();
  }

  resize() {
    this.unit = Math.floor(Math.min(window.innerWidth / 56, window.innerHeight / 35));
    this.canvas.width = 56 * this.unit;
    this.canvas.height = 35 * this.unit;
    this.draw();
  }
}

P83Game.GAME_STATE_MAP = Symbol();
P83Game.GAME_STATE_MISSION = Symbol();
