## Type It Up

### Background

Pump It Up and Dance Dance Revolution are popular rhythm games in which a player watches scrolling arrows and steps on the corresponding arrow on a dance pad, following the music's beat. Type It Up modified this formula by changing the arrows to keys on a keyboard. Players can type along to fun tunes to help increase their typing speed.

### Functionality & MVP  

In Type It Up, users will be able to:

- [ ] Choose from three different difficulties (Slow, Medium, and Fast)
- [ ] Play along with a song by typing preset text to the beat.
- [ ] Receive a score indicating how many correct and on-time keys were hit.
- [ ] Be able to play the same song again, or try another one.

In addition, this project will include:

- [ ] A production Readme

### Wireframes

The app will have a splash screen where the user can pick their difficulty.

[splash]: proposal/splash.png

The main gameplay will feature scrolling horizontal text with two vertical bars on the left. Users will type the appropriate key when it is between the two bars. If they do, their score will go up. If they don't, they will lose some health, represented by the health bar.

### Architecture and Technologies


This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be one script involved in this project:

`game.js`: this script will handle the logic playing a song, creating and animating the text, and handling user input.

### Implementation Timeline

**Day 1**:
Get text scrolling across the screen

**Day 2**:
Get key events working, get timing of key presses ("good"/"miss") working.

**Day 3**:
Health/game over/score/retry

**Day 4**:
Polish and css.


### Bonus features
 Some anticipated updates are:

- [ ] Adding text customization options (capitalization on/off, punctuation on/off, custom text entry)
- [ ] High scores page
- [ ] More creative rhythmic patterns
