## Type It Up

### Background

Pump It Up and Dance Dance Revolution are popular rhythm games in which a player watches scrolling arrows and steps on the corresponding arrow on a dance pad, following the music's beat. Type It Up modifies this formula by changing the arrows to keys on a keyboard. Players can type along to fun tunes to help increase their typing speed.

### How To Play

On the main menu, simply use the mouse or the up/down keys and enter to choose a difficulty. Difficulty is based on song beats per minute, or BPM, which is then converted into words per minute, or WPM based on a five letters per word standard conversion. Note: Even if you are a fast typer, typing to the beat is a whole new challenge. Don't try to tackle Hard right away - it's quite difficult!

Once the song begins, place your hands on the home row. Wait for the 3...2...1... countdown and type the letters with the beat as they enter the hit zone, denoted by vertical black bars.

![gameplay](http://i.imgur.com/BNZxuHJ.jpg)

Missing the letter will cause you to lose a little health, but don't worry - hitting letters will restore a little. If you lose all your health, you'll get a gameover.

### Technical Aspects

The song class takes a few necessary parameters. Length in seconds, BPM (which can be calculated by looking at the waveform or analyzed by many free online tools), timeOffset, which is the time between the start of the audio file and the first beat (this is easy to find looking at the waveform in a free audio editing software such as Audacity), total beats, which can be calculated or counted by listening, and hSpace, which is an adjustable number that regulates the pixel count between letters. In the song class, an algorithm calculates the number of milliseconds between each leftward pixel adjust based on BPM and hSpace to ensure the next letter crosses the hit zone in time with the next beat. A lower hSpace will cause slower scrolling and more tightly bunched letters, while a higher hSpace will increase the scroll speed and place more distance between the letters. I found an hSpace of 100 pixels to be a comfortable speed for songs in the BPM range of 100-300 (almost all music).

One slight technical restriction is that only certain BPMs can be uses. The reason for this is that hSpace must not be fractional, as small rounding errors will eventually compound and cause letters to not cross the hit box at the appropriate time. To calculate these BPMs, I worked backwards using the following:

TimeBetweenBeats (TBB) = (60s * 1000 ms/s) / BPM
Interval = TBB / hSpace

Since hSpace must be a whole number, BPM must be a factor of 60000. The prime factors of 60000 are 2^5 * 3 * 5^4. Knowing nearly all recorded music falls somewhere between ~50 and 200 BPM, and that any song with quarter notes at X BPM can be reinterpreted as eighth notes at X/2 BPM, I came up with the list of acceptable BPMs that are evenly divisible by 60000 and somewhere in that range. They include 100, 120, 125, 150, and 200 for commonly used BPMs.

I also used the HTML5 audio player's readyState property to ensure songs are loaded even over a slow connection before starting game logic so that songs and display stay synced.

With all this in place, I accomplished scrolling letters simply by calculating the hAdjustIntervalTime, which is the amount of ms for each pixel shift. Since older browsers can't support intervals of under 10ms, I multiplied by a small factor to get an interval time > 10ms.

```javascript

this.secondsPerBeat = 60 / bpm;
this.hAdjustIntervalTime = (this.secondsPerBeat / hSpace) * 1000;
this.hAdjustInterval = window.setInterval( () => {
  this.hAdjust += 3;
}, this.hAdjustIntervalTime * 3);
```
