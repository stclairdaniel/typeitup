class Song {
  constructor(path, time, bpm, offset, hSpace, text, nudge, beats) {
    // offset is how far the first letter starts to the right of the edge
    // hSpace is the number of pixels between letters.
    // It can be adjusted for slower/faster scrolling
    // nudge is a magic number that helps sync letters array with start of song
    this.path = path;
    this.time = time;
    this.bpm = bpm;
    this.offset = offset;
    this.hSpace = hSpace;
    this.text = text;
    this.nudge = nudge;
    this.beats = beats;

    this.hAdjust = 0;

    this.canvas = document.getElementById("text-canvas");
    this.ctx = this.canvas.getContext("2d");

    //find the total number of letters to take from the text
    this.letters = text.split("").slice(0, this.beats);
    this.drawLetters = this.letters.map( letter => {
      if (letter === " ") {
        return "⌾";
      } else {
        return letter;
      }
    });

    // calculate "speed" - num ms for each letter to move one hSpace
    this.secondsPerBeat = 60 / bpm;
    this.hAdjustInterval = (this.secondsPerBeat / hSpace) * 1000;
  }

  start () {
    //reset hAdjust
    this.hAdjust = 0;
    //Start hAdjust interval to move letters across the screen
    this.hAdjustInterval = window.setInterval( () => {
      this.hAdjust++;
    }, this.hAdjustInterval);
  }

  drawText () {
    this.ctx.font = "48px 'Anonymous Pro', monospace";
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    for (let i=0; i < this.letters.length; i++) {
      const hPos = this.canvas.width + this.offset + this.hSpace * (i) - this.hAdjust;
      if (this.letters[i] !== "@" && hPos > 0 && hPos < this.canvas.width) {
        this.ctx.fillText(this.drawLetters[i], hPos, this.canvas.height / 2);
      }
    }
  }
}

export default Song;
