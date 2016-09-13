import Song from './song';
import Menu from './menu';

class Game {
  constructor(song) {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.textCanvas = document.getElementById("text-canvas");
    this.textCtx = this.canvas.getContext("2d");
    this.song = song;

    this.goToMenu = window.setInterval( () => {
      const audio = document.querySelector('audio');
      const time = audio.currentTime;
      if (time > this.song.time) {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.textCtx.clearRect(0,0,this.textCanvas.width, this.textCanvas.height);
        clearInterval(this.goToMenu)
        const menu = new Menu;
        menu.draw();
      }
    }, 1000);
  }

  startSong () {
    const body = document.querySelector('body');
    const audio = document.createElement('audio');
    audio.src = `${this.song.path}`;
    audio.controls = true;
    audio.autoplay = true;
    body.appendChild(audio);
  }

  score () {
    document.addEventListener("keypress", e => {
      this.checkHit(e.key);
    });
    window.setInterval( () => {
      this.checkMiss();
    }, (this.song.secondsPerBeat * 1000));
  }

  checkHit (key) {
    const audio = document.querySelector('audio');
    const time = audio.currentTime;
    let beatOffset = this.song.offset / this.song.hSpace;
    let timeOffset = beatOffset  / (this.song.bpm  / 60);
    let i = ((time - timeOffset) / this.song.secondsPerBeat);
    console.log(Math.floor(i));
    console.log(this.song.letters[Math.floor(i) - this.song.nudge]);
    if (this.song.letters[Math.floor(i) - this.song.nudge]=== key) {
      console.log("hit");
      this.song.letters[Math.floor(i) - this.song.nudge] = "@";
    }
  }

  checkMiss () {
    const audio = document.querySelector('audio');
    const time = audio.currentTime;
    let beatOffset = this.song.offset / this.song.hSpace;
    let timeOffset = beatOffset  / (this.song.bpm  / 60);
    let i = ((time - timeOffset) / this.song.secondsPerBeat);
    if (this.song.letters[Math.floor(i) - 1 - this.song.nudge] !== "@"
        && Math.floor(i) - 1 - this.song.nudge > 0
        && Math.floor(i) <= this.song.letters.length) {
      console.log("miss");
      this.song.letters[Math.floor(i) - 1 - this.song.nudge] = "#";
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
    };
    baseImage.src = 'assets/background.jpg';
  }
}

export default Game;
