import Song from './song';

class Game {
  constructor(song) {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.song = song;
  }

  startSong () {
    const body = document.querySelector('body');
    const audio = document.createElement('audio');
    audio.src = `${this.song.path}`;
    audio.controls = true;
    audio.autoplay = true;
    body.appendChild(audio);
  }

  listenKeys () {
    document.addEventListener("keypress", e => {
      this.checkHit(e.key);
    });
  }

  checkHit (key) {
    console.log(key);
    const audio = document.querySelector('audio');
    const time = audio.currentTime;
    let beatOffset = this.song.offset / this.song.hSpace;
    let timeOffset = beatOffset  / (this.song.bpm  / 60);
    let i = ((time - timeOffset) / this.song.secondsPerBeat);
    if (this.song.letters[Math.floor(i) - this.song.nudge]=== key) {
      console.log("hit");
      this.song.letters[Math.floor(i) - this.song.nudge] = "@";
    }
  }

  draw() {
    const baseImage = new Image();
    baseImage.onload = () => {
      this.ctx.drawImage(baseImage, 0, 0);
      this.ctx.fillStyle = "green";
      this.ctx.fillRect(25,25,2,100);
      this.ctx.fillRect(50,25,2,100);
      this.song.drawText();
    };
    baseImage.src = 'assets/background.jpg';
  }
}

export default Game;
