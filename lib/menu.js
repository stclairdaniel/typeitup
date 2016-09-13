import Game from './game';
import Song from './song';

class Menu {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.options = [0,1,2];
    this.selected = 0;

    document.addEventListener("keydown", e => {
      console.log(e);
      if (e.key === "ArrowDown") {
        this.selected += 1;
        this.selected = this.selected % 3;
      }
      if (e.key === "ArrowUp") {
        this.selected -= 1;
        this.selected = this.selected % 3;
      }

      if (e.key === "Enter") {
        this.playSong();
      }
    });

    this.drawMenu = window.setInterval ( () => {
      this.draw();
    }, 20);
  }

  draw() {
    const baseImage = new Image();
    baseImage.onload = () => {
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
      this.ctx.drawImage(baseImage, 0, 0);
      this.ctx.font = "32px 'Anton'";
      this.ctx.fillStyle = "black";
      this.ctx.fillText("Type It Up!", 50, 40);
      this.ctx.fillText("Select Difficulty", 50, 80);
      if (this.selected === 0) {
        this.ctx.fillStyle = "white";
      } else {
        this.ctx.fillStyle = "black";
      }
      this.ctx.fillText("Easy (24 WPM)", 50, 120);
      if (this.selected === 1) {
        this.ctx.fillStyle = "white";
      } else {
        this.ctx.fillStyle = "black";
      }
      this.ctx.fillText("Medium", 50, 160);
      if (this.selected === 2) {
        this.ctx.fillStyle = "white";
      } else {
        this.ctx.fillStyle = "black";
      }
      this.ctx.fillText("Hard", 50, 200);
    };
    baseImage.src = 'assets/background.jpg';
  }

  playSong () {
    clearInterval(this.drawMenu);
      const text = "I had seen little of Holmes lately. My marriage had drifted us away from each other. My own complete happiness, and the home-centred interests which rise up around the man who first finds himself master of his own establishment, were sufficient to absorb all my attention, while Holmes, who loathed every form of society with his whole Bohemian soul, remained in our lodgings in Baker Street, buried among his old books, and alternating from week to week between cocaine and ambition, the drowsiness of the drug, and the fierce energy of his own keen nature."
    if (this.selected === 0) {
      const song = new Song('assets/test.mp3', 95, 120, 3200, 100, text, 8, 144);
      const game = new Game(song);
      game.startSong();
      game.score();
      window.setInterval( () => {
        game.draw();
      }, 20);
    }

  }
}
 export default Menu;
