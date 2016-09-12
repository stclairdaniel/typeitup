class Song {
  constructor(path, time, bpm, offset, hSpace, text) {
    // offset is the time in ms from the start of the audio until the first beat
    // hSpacing is the number of pixels between letters.
    // It can be adjusted for slower/faster scrolling
    this.path = path;
    this.time = time;
    this.bpm = bpm;
    this.offset = offset;
    this.hSpace = hSpace;
    this.hAdjust = 0;
    this.letters = text.split("");


    //find the total number of letters to take from the text
    this.numBeats = bpm / 60 * (this.time - this.offset);

    // calculate "speed" - num ms for each letter to move one hSpace
    const secondsPerBeat = 60 / bpm;
    this.hAdjustInterval = (secondsPerBeat / hSpace) * 1000;

    this.canvas = document.getElementById("text-canvas");
    this.ctx = this.canvas.getContext("2d");

    //Start hAdjust interval to move letters across the screen
    window.setInterval( () => {
      this.hAdjust += 1;
    }, this.hAdjustInterval);
  }

  drawText () {
    this.ctx.font = "32px 'Anonymous Pro', monospace";
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    for (let i=0; i < this.letters.length; i++) {
      const hPos = this.canvas.width + this.hSpace * (i - 1) - this.hAdjust;
      this.ctx.fillText(this.letters[i], hPos, this.canvas.height / 2);
    }
  }
}

export default Song;
