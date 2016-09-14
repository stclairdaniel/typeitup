import Game from './game';
import Song from './song';
import textArray from '../assets/text';

class Menu {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.selected = 0;
    this.keypress = this.keypress.bind(this);
  }

  keypress (e) {
    if (e.key === "ArrowDown") {
      this.selected += 1;
      this.selected = this.selected % 3;
    }
    if (e.key === "ArrowUp") {
      this.selected -= 1;
      if (this.selected === -1) {
        this.selected = 2;
      }
    }
    if (e.key === "Enter") {
      window.clearInterval(this.drawMenu);
      this.playSong();
    }
  }

  start () {
    // move up and down through menu. Enter starts a song and clears menu draw
    document.addEventListener("keydown", this.keypress, false);

    // begin drawing menu
    this.drawMenu = window.setInterval ( () => {
      this.draw();
    }, 20);
  }

  draw() {
    const baseImage = new Image();
    baseImage.onload = () => {
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
      this.ctx.drawImage(baseImage, 0, 0);
      this.ctx.font = "48px 'Anton'";
      this.ctx.fillStyle = "black";
      this.ctx.fillText("Type It Up!", 100, 70);
      this.ctx.font = "32px 'Anton'";
      this.ctx.fillText("Select Difficulty:", 100, 100);
      if (this.selected === 0) {
        this.ctx.fillStyle = "white";
      } else {
        this.ctx.fillStyle = "black";
      }
      this.ctx.fillText("Easy (24 WPM)", 100, 150);
      if (this.selected === 1) {
        this.ctx.fillStyle = "white";
      } else {
        this.ctx.fillStyle = "black";
      }
      this.ctx.fillText("Medium", 100, 200);
      if (this.selected === 2) {
        this.ctx.fillStyle = "white";
      } else {
        this.ctx.fillStyle = "black";
      }
      this.ctx.fillText("Hard", 100, 250);
      this.ctx.fillStyle = "black";
      this.ctx.fillText("How to Play:", 300, 400);
      this.ctx.fillText("Type the letters you see to the beat!", 300, 450);
      this.ctx.fillText("Press the spacebar when you see ⌾", 300, 500);
    };
    baseImage.src = 'assets/background.jpg';
  }

  playSong () {
    const testText = "                                                                                                    "
    document.removeEventListener("keydown", this.keypress, false);
    const text = textArray[Math.floor(Math.random() * (textArray.length - 1))];
    if (this.selected === 0) {
      const song = new Song('assets/easy.mp3', 95, 120, 3185, 100, text, 8, 144);
      const game = new Game(song);
      game.start();
    }
    if (this.selected === 1) {
      const song = new Song('assets/medium.mp3', 93, 180, 1725, 150, testText, 18, 144);
      const game = new Game(song);
      game.start();
    }

  }
}
 export default Menu;
