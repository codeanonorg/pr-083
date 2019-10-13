import Game from "./game.js";

const game = new Game("canvas", "data");

document.getElementById("music").volume = 0.01;
document.getElementById("music").play();
