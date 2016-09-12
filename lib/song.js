class Song {
  constructor(path, time, bpm, offset, hSpacing) {
    // offset is the time in ms from the start of the audio until the first beat
    // hSpacing is the number of pixels between letters.
    // It can be adjusted for slower/faster scrolling
    this.path = path;
    this.time = time;
    this.bpm = bpm;
    this.offset = offset;
    this.hSpacing = hSpacing;


    //find the total number of letters to take from the text
    this.numBeats = bpm / 60 * (this.time - this.offset);

    const secondsPerBeat = 60 / bpm;

    this.hAdjustInterval = secondsPerBeat / hSpacing;
  }
}
