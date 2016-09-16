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
    this.resize = this.resize.bind(this);
    this.caps = true;
    this.punctuation = true;
    if (window.innerWidth > 1000) {
      this.xMargin = (window.innerWidth - 1000) / 2;
    }
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
    if (e.clientX > 100 + this.xMargin && e.clientX < 340 + this.xMargin) {
      if (e.clientY > 120 && e.clientY < 155) {
        window.clearInterval(this.drawMenu);
        this.playSong(0);
      }
      if (e.clientY > 170 && e.clientY < 205) {
        window.clearInterval(this.drawMenu);
        this.playSong(1);
      }
      if (e.clientY > 220 && e.clientY < 255) {
        window.clearInterval(this.drawMenu);
        this.playSong(2);
      }
    }
    if (e.clientX > 450 + this.xMargin && e.clientX < 670 + this.xMargin) {
      if (e.clientY > 120 && e.clientY < 155) {
        this.punctuation = !this.punctuation;
      }
      if (e.clientY > 170 && e.clientY < 205) {
        this.caps = !this.caps;
      }
    }
  }

  hover (e) {
    if (e.clientX > 100 + this.xMargin && e.clientX < 340 + this.xMargin) {
      if (e.clientY > 120 && e.clientY < 155) {
        this.selected = 0;
      }
      if (e.clientY > 170 && e.clientY < 205) {
        this.selected = 1;
      }
      if (e.clientY > 220 && e.clientY < 255) {
        this.selected = 2;
      }
    }
    if (e.clientX > 450 + this.xMargin && e.clientX < 670 + this.xMargin) {
      if (e.clientY > 120 && e.clientY < 155) {
        this.selected = 3;
      }
      if (e.clientY > 170 && e.clientY < 205) {
        this.selected = 4;
      }
    }
  }

  resize () {
    if (window.innerWidth > 1000) {
      this.xMargin = (window.innerWidth - 1000) / 2;
    }
  }

  start () {
    // move up and down through menu. Enter starts a song and clears menu draw
    document.addEventListener("keydown", this.keypress, false);
    document.addEventListener("click", this.click, false);
    document.addEventListener("mousemove", this.hover, false);
    window.addEventListener('resize', this.resize, false);

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
    window.removeEventListener('resize', this.resize, false);

    const text = textArray[Math.floor(Math.random() * (textArray.length - 1))];
    if (selected === 0) {
      const song = new Song('http://res.cloudinary.com/loudsounds/video/upload/v1473962530/easy_c6pnms.mp3', 95, 120, 3185, 100, text, 144, 20.345, this.caps, this.punctuation);
      const game = new Game(song, 'assets/easy.jpg');
      game.start();
    }
    if (selected === 1) {
      const song = new Song('http://res.cloudinary.com/loudsounds/video/upload/v1473962527/medium_fppvup.mp3', 88, 200, 2700, 100, text, 255, 10.85, this.caps, this.punctuation);
      const game = new Game(song, 'assets/medium.jpg');
      game.start();
    }
    if (selected === 2) {
      const song = new Song('http://res.cloudinary.com/loudsounds/video/upload/v1473997490/First_Day_v9rzak.mp3', 95, 250, 2300, 100, text, 352, 7.75, this.caps, this.punctuation);
      const game = new Game(song, 'assets/hard.jpg');
      game.start();
    }

  }
}
 export default Menu;
