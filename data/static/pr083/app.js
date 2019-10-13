import Game from "./game.js";

const music = document.getElementById("music");
if (music) {
  music.volume = 0.01;
  music.play();
}
document.addEventListener("load", () => {
});

(function () {
  new Game("canvas", "data");
})();
