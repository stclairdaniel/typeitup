import Menu from './menu';
import Game from './game';
import Song from './song';

class Gameover {
  constructor(failStatus, song, score, background) {
    this.failStatus = failStatus;
    this.song = song;
    this.score = score;
    this.background = background;
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.tCanvas = document.getElementById("text-canvas");
    this.tCtx = this.tCanvas.getContext("2d");
    this.selected = 0;
    this.keypress = this.keypress.bind(this);
    this.click = this.click.bind(this);
    this.hover = this.hover.bind(this);
  }

  retry () {
    document.removeEventListener("keydown", this.keypress, false);
    document.removeEventListener("click", this.click, false);
    document.removeEventListener("mousemove", this.hover, false);
    window.clearInterval(this.drawGameover);
    //Not sure why I need a new song, but starting a new game
    //with old song messed up timings
    const song = new Song(this.song.path, this.song.time, this.song.bpm,
                          this.song.offset, this.song.hSpace, this.song.text,
                          this.song.beats, this.song.timeOffset, this.song.caps, this.song.punctuation);
    const game = new Game(song, this.background);
    game.start();
  }

  goToMenu () {
    document.removeEventListener("keydown", this.keypress, false);
    document.removeEventListener("click", this.click, false);
    document.removeEventListener("mousemove", this.hover, false);
    window.clearInterval(this.drawGameover);
    const menu = new Menu;
    menu.start();
  }

  keypress (e) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (this.selected === 0) {
        this.selected = 1;
      } else {
        this.selected = 0;
      }
    }
    if (e.key === "Enter" && this.selected === 0) {
      this.retry();
    }
    if (e.key === "Enter" && this.selected === 1) {
      this.goToMenu();
    }
  }

  click (e) {
    if (e.screenX > 495 && e.screenX < 564) {
      if (e.screenY > 292 && e.screenY < 325) {
        this.retry();
      }
      if (e.screenY > 345 && e.screenY < 374) {
        this.goToMenu();
      }
    }
  }

  hover (e) {
    if (e.screenX > 495 && e.screenX < 564) {
      if (e.screenY > 292 && e.screenY < 325) {
        this.selected = 0;
      }
      if (e.screenY > 345 && e.screenY < 374) {
        this.selected = 1;
      }
    }
  }

  start () {
    // move up and down through menu. Enter starts a song and clears menu draw
    document.addEventListener("keydown", this.keypress, false);
    document.addEventListener("click", this.click, false);
    document.addEventListener("mousemove", this.hover, false);

    // begin drawing menu
    this.drawGameover = window.setInterval ( () => {
      this.draw();
    }, 20);
  }

  draw() {
    const baseImage = new Image();
    baseImage.onload = () => {
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
      this.tCtx.clearRect(0,0,this.tCanvas.width, this.tCanvas.height);
      this.ctx.drawImage(baseImage, 0, 0);
      this.ctx.font = "48px 'Anton'";
      this.ctx.fillStyle = "black";
      let message;
      if (this.failStatus === "failed") {
        message = "Game over. Not feeling the rhythm?";
      } else {
        message = `Nice job! You got ${this.score} points`;
      }
      this.ctx.fillText(message, 200, 70);
      this.ctx.font = "32px 'Anton'";
      if (this.selected === 0) {
        this.ctx.fillStyle = "white";
      } else {
        this.ctx.fillStyle = "black";
      }
      this.ctx.fillText("Retry", 400, 200);
      if (this.selected === 1) {
        this.ctx.fillStyle = "white";
      } else {
        this.ctx.fillStyle = "black";
      }
      this.ctx.fillText("Menu", 400, 250);
    };
    baseImage.src = this.background;
  }

}

export default Gameover;
