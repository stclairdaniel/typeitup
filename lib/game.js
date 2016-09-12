class Game {
  constructor(songPath, bpm, time, offset, text) {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.textCanvas = document.getElementById("text-canvas");
    this.textCtx = this.textCanvas.getContext("2d");
    this.songPath = songPath;
    this.bpm = bpm;
    this.time = time;
    this.letters = text.split("");
    this.hAdjust = offset;

    window.setInterval( () => {
      this.hAdjust += 1;
    }, 20);
  }

  playSong () {
    const body = document.querySelector("body");
    const audio = document.createElement('audio');
    audio.src = `${this.songPath}`;
    audio.controls = true;
    audio.autoplay = true;
    body.appendChild(audio);
  }

  drawText () {
    //magic numbers to regulate smooth text scrolling
    const hSpacing = 25;

    this.textCtx.font = "32px 'Anonymous Pro', monospace";
    this.textCtx.clearRect(0,0,this.textCanvas.width, this.textCanvas.height);
    for (let i=0; i < this.letters.length; i++) {
      const hPos = this.textCanvas.width + hSpacing * (i - 1) - this.hAdjust;
      this.textCtx.fillText(this.letters[i], hPos, this.textCanvas.height / 2);
    }
  }

  draw() {
    const baseImage = new Image();
    baseImage.onload = () => {
      this.ctx.drawImage(baseImage, 0, 0);
      this.drawText();
    };
    baseImage.src = 'assets/background.jpg';
  }
}

export default Game;
