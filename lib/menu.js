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
      this.ctx.fillText("Medium (40 WPM)", 100, 200);
      if (this.selected === 2) {
        this.ctx.fillStyle = "white";
      } else {
        this.ctx.fillStyle = "black";
      }
      this.ctx.fillText("Hard (60 WPM)", 100, 250);
      this.ctx.fillStyle = "black";
      this.ctx.fillText("How to Play:", 300, 400);
      this.ctx.fillText("Type the letters you see to the beat!", 300, 450);
      this.ctx.fillText("Press the spacebar when you see ⌾", 300, 500);
    };
    baseImage.src = 'assets/menuBG.jpg';
  }

  playSong () {
    document.removeEventListener("keydown", this.keypress, false);
    const text = textArray[Math.floor(Math.random() * (textArray.length - 1))];
    if (this.selected === 0) {
      const song = new Song('assets/easy.mp3', 95, 120, 3185, 100, text, 144, 20.345);
      const game = new Game(song, 'assets/easy.jpg');
      game.start();
    }
    if (this.selected === 1) {
      const song = new Song('assets/medium.mp3', 88, 200, 2725, 100, text, 258, 10.85);
      const game = new Game(song, 'assets/medium.jpg');
      game.start();
    }
    if (this.selected === 2) {
      const song = new Song('assets/hard.mp3', 125, 300, 5750, 100, text, 480, 13.23);
      const game = new Game(song, 'assets/hard.jpg');
      game.start();
    }

  }
}
 export default Menu;
