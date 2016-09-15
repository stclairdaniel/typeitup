import Game from './game';
import Song from './song';
import textArray from '../assets/text';

class Menu {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.selected = 0;
    this.keypress = this.keypress.bind(this);
    this.click = this.click.bind(this);
    this.hover = this.hover.bind(this);
    this.caps = true;
    this.punctuation = true;
  }

  keypress (e) {
    if (e.key === "ArrowDown") {
      this.selected += 1;
      this.selected = this.selected % 5;
    }
    if (e.key === "ArrowUp") {
      this.selected -= 1;
      if (this.selected === -1) {
        this.selected = 4;
      }
    }
    if (e.key === "Enter" && this.selected <= 2) {
      window.clearInterval(this.drawMenu);
      this.playSong(this.selected);
    } else if (e.key === "Enter" && this.selected === 3) {
      this.punctuation = !this.punctuation;
    } else if (e.key === "Enter" && this.selected === 4) {
      this.caps = !this.caps;
    }
  }

  click (e) {
    console.log(e);
    if (e.screenX > 121 && e.screenX < 440) {
      if (e.screenY > 258 && e.screenY < 282) {
        window.clearInterval(this.drawMenu);
        this.playSong(0);
      }
      if (e.screenY > 295 && e.screenY < 336) {
        window.clearInterval(this.drawMenu);
        this.playSong(1);
      }
      if (e.screenY > 342 && e.screenY < 384) {
        window.clearInterval(this.drawMenu);
        this.playSong(2);
      }
    }
    if (e.screenX > 485 && e.screenX < 700) {
      if (e.screenY > 278 && e.screenY < 307) {
        this.punctuation = !this.punctuation;
      }
      if (e.screenY > 321 && e.screenY < 357) {
        this.caps = !this.caps;
      }
    }
  }

  hover (e) {
    console.log(e);
    if (e.screenX > 121 && e.screenX < 440) {
      if (e.screenY > 258 && e.screenY < 282) {
        this.selected = 0;
      }
      if (e.screenY > 295 && e.screenY < 336) {
        this.selected = 1;
      }
      if (e.screenY > 342 && e.screenY < 384) {
        this.selected = 2;
      }
    }
    if (e.screenX > 485 && e.screenX < 700) {
      if (e.screenY > 278 && e.screenY < 307) {
        this.selected = 3;
      }
      if (e.screenY > 321 && e.screenY < 357) {
        this.selected = 4;
      }
    }
  }

  start () {
    // move up and down through menu. Enter starts a song and clears menu draw
    document.addEventListener("keydown", this.keypress, false);
    document.addEventListener("click", this.click, false);
    document.addEventListener("mousemove", this.hover, false);

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
      this.ctx.fillText("Easy        (24 WPM)", 100, 150);
      if (this.selected === 1) {
        this.ctx.fillStyle = "white";
      } else {
        this.ctx.fillStyle = "black";
      }
      this.ctx.fillText("Medium  (40 WPM)", 100, 200);
      if (this.selected === 2) {
        this.ctx.fillStyle = "white";
      } else {
        this.ctx.fillStyle = "black";
      }
      this.ctx.fillText("Hard        (60 WPM)", 100, 250);
      if (this.selected === 3) {
        this.ctx.fillStyle = "white";
      } else {
        this.ctx.fillStyle = "black";
      }
      if (this.punctuation) {
        this.ctx.fillText("Punctuation On", 450, 150);
      } else {
        this.ctx.fillText("Punctuation Off", 450, 150);
      }
      if (this.selected === 4) {
        this.ctx.fillStyle = "white";
      } else {
        this.ctx.fillStyle = "black";
      }
      if (this.caps) {
        this.ctx.fillText("Capitalization On", 450, 200);
      } else {
        this.ctx.fillText("Capitalization Off", 450, 200);
      }
      this.ctx.fillStyle = "black";
      this.ctx.fillText("How to Play:", 300, 400);
      this.ctx.fillText("Type the scrolling letters to the beat!", 300, 450);
      this.ctx.fillText("Press the spacebar when you see ⎵", 300, 500);
    };
    baseImage.src = 'assets/menuBG.jpg';
  }

  playSong (selected) {
    document.removeEventListener("keydown", this.keypress, false);
    document.removeEventListener("click", this.click, false);
    document.removeEventListener("mousemove", this.hover, false);

    const text = textArray[Math.floor(Math.random() * (textArray.length - 1))];
    if (selected === 0) {
      const song = new Song('http://res.cloudinary.com/loudsounds/video/upload/v1473962530/easy_c6pnms.mp3', 95, 120, 3185, 100, text, 144, 20.345, this.caps, this.punctuation);
      const game = new Game(song, 'assets/easy.jpg');
      game.start();
    }
    if (selected === 1) {
      const song = new Song('http://res.cloudinary.com/loudsounds/video/upload/v1473962527/medium_fppvup.mp3', 88, 200, 2725, 100, text, 255, 10.85, this.caps, this.punctuation);
      const game = new Game(song, 'assets/medium.jpg');
      game.start();
    }
    if (selected === 2) {
      const song = new Song('http://res.cloudinary.com/loudsounds/video/upload/v1473962535/hard_xkhdjp.mp3', 100, 300, 2365, 100, text, 464, 6.55, this.caps, this.punctuation);
      const game = new Game(song, 'assets/hard.jpg');
      game.start();
    }

  }
}
 export default Menu;
