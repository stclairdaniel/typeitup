import Song from './song';
import Menu from './menu';

class Game {
  constructor(song) {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.tCanvas = document.getElementById("text-canvas");
    this.tCtx = this.canvas.getContext("2d");
    this.song = song;
    this.checkHit = this.checkHit.bind(this)
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
    document.addEventListener("keypress", this.checkHit, false);
    this.checkMissInterval = window.setInterval( () => {
      this.checkMiss();
    }, (this.song.secondsPerBeat * 1000));

  }

  checkHit (e) {
    console.log("game keypress");
    const audio = document.querySelector('audio');
    const time = audio.currentTime;
    let beatOffset = this.song.offset / this.song.hSpace;
    let timeOffset = beatOffset  / (this.song.bpm  / 60);
    let i = ((time - timeOffset) / this.song.secondsPerBeat);
    if (this.song.letters[Math.floor(i) - this.song.nudge]=== e.key) {
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

  start () {
    //begin drawing
    this.drawGame = window.setInterval( () => {
      this.draw();
    }, 20);

    //play music
    this.startSong();

    //start score
    this.score();

    //end drawing and draw menu if song is over
    this.goToMenu = window.setInterval( () => {
      const audio = document.querySelector('audio');
      const time = audio.currentTime;
      if (time > this.song.time) {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.tCtx.clearRect(0,0,this.tCanvas.width, this.tCanvas.height);
        clearInterval(this.goToMenu);
        clearInterval(this.drawGame);
        clearInterval(this.checkMissInterval);
        audio.remove();
        document.removeEventListener("keypress", this.checkHit, false);
        const menu = new Menu;
        menu.start();
      }
    }, 1000);

  }

}

export default Game;
