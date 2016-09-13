class Song {
  constructor(path, time, bpm, offset, hSpace, text, nudge, beats) {
    // offset is how far the first letter starts to the right of the edge
    // hSpacing is the number of pixels between letters.
    // It can be adjusted for slower/faster scrolling
    // nudge is a magic number that helps sync letters array with start of song
    this.path = path;
    this.time = time;
    this.bpm = bpm;
    this.offset = offset;
    this.hSpace = hSpace;
    this.hAdjust = 0;
    this.nudge = nudge;
    this.beats = beats;

    this.canvas = document.getElementById("text-canvas");
    this.ctx = this.canvas.getContext("2d");

    //find the total number of letters to take from the text
    this.letters = text.split("").slice(0, this.beats);

    // calculate "speed" - num ms for each letter to move one hSpace
    this.secondsPerBeat = 60 / bpm;
    this.hAdjustInterval = (this.secondsPerBeat / hSpace) * 1000;

    //Start hAdjust interval to move letters across the screen
    window.setInterval( () => {
      this.hAdjust++;
    }, this.hAdjustInterval);
  }

  drawText () {
    this.ctx.font = "48px 'Anonymous Pro', monospace";
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    for (let i=0; i < this.letters.length; i++) {
      const hPos = this.canvas.width + this.offset + this.hSpace * (i) - this.hAdjust;
      if (this.letters[i] !== "@") {
        this.ctx.fillText(this.letters[i], hPos, this.canvas.height / 2);
      }
    }
  }
}

export default Song;
