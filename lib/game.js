import Song from './song';
import Gameover from './gameover';

class Game {
  constructor(song) {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.tCanvas = document.getElementById("text-canvas");
    this.tCtx = this.tCanvas.getContext("2d");
    this.sCanvas = document.getElementById("score-canvas");
    this.sCtx = this.sCanvas.getContext("2d");
    this.song = song;
    this.letters = song.letters;
    this.checkHit = this.checkHit.bind(this);
    this.score = 0;
    this.life = 1;
    this.judge = new Image();
    this.judge.src = 'assets/judge.png';
  }

  startSong () {
    const body = document.querySelector('body');
    const audio = document.createElement('audio');
    audio.src = `${this.song.path}`;
    audio.controls = true;
    audio.autoplay = true;
    body.appendChild(audio);
  }

  checkScore () {
    document.addEventListener("keypress", this.checkHit, false);
    this.checkMissInterval = window.setInterval( () => {
      this.checkMiss();
    }, (this.song.secondsPerBeat * 1000));

  }

  checkHit (e) {
    const audio = document.querySelector('audio');
    const time = audio.currentTime;
    let i = ((time - this.song.timeOffset) / this.song.secondsPerBeat);
    if (this.song.letters[Math.round(i)] === e.key) {
      this.sCtx.clearRect(0,0,this.sCanvas.width, this.sCanvas.height);
      this.sCtx.drawImage(this.judge, 50, 200, 500, 150, 100, 150, 250, 75);
      this.letters[Math.round(i)] = "@";
      this.score += 100;
      if (this.life < 1) {
        this.life += 0.01;
      }
    }
  }

  checkMiss () {
    const audio = document.querySelector('audio');
    const time = audio.currentTime;
    let i = ((time - this.song.timeOffset) / this.song.secondsPerBeat);
    if (this.letters[Math.round(i) - 1] !== "@"
        && Math.round(i) - 1 > 0
        && Math.round(i) <= this.song.letters.length) {
      this.sCtx.clearRect(0,0,this.sCanvas.width, this.sCanvas.height);
      this.sCtx.drawImage(this.judge, 50, 1000, 500, 150, 100, 150, 250, 75);
      if (this.life > 0.05) {
        this.life -= 0.05;
      } else {
        this.gameover("failed", this.song, this.score);
      }
    }
  }

  draw() {
    const baseImage = new Image();
    baseImage.onload = () => {
      this.ctx.drawImage(baseImage, 0, 0);
      this.ctx.fillStyle = "darkgreen";
      this.ctx.fillRect(100,250,2,100);
      this.ctx.fillRect(150,250,2,100);
      this.song.drawText();
      this.ctx.fillStyle = "black";
      this.ctx.font = "32px 'Anton'";
      this.ctx.fillText(`Score: ${this.score}`, 700, 100);
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(300,75,this.life * 325,25);
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(300 + this.life * 325,75,((1 - this.life) * 325),25);
    };
    baseImage.src = 'assets/background.jpg';
  }

  gameover (failStatus, song, score) {
    window.clearInterval(this.goToMenu);
    window.clearInterval(this.drawGame);
    window.clearInterval(this.checkMissInterval);
    window.clearInterval(this.song.hAdjustInterval);
    const audio = document.querySelector('audio');
    audio.remove();
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    this.tCtx.clearRect(0,0,this.tCanvas.width, this.tCanvas.height);
    this.sCtx.clearRect(0,0,this.sCanvas.width, this.sCanvas.height);
    document.removeEventListener("keypress", this.checkHit, false);
    const gameoverScreen = new Gameover(failStatus, song, score);
    gameoverScreen.start();
  }

  start () {
    //begin drawing
    this.drawGame = window.setInterval( () => {
      this.draw();
    }, 20);

    //play music
    this.startSong();

    //start song text scrolling
    this.song.start();

    //start score
    this.checkScore();

    //end drawing and draw gameover screen if song is over
    this.goToMenu = window.setInterval( () => {
      const audio = document.querySelector('audio');
      const time = audio.currentTime;
      if (time > this.song.time) {
        this.gameover("passed", this.song, this.score);
      }
    }, 1000);

  }

}

export default Game;
