import Game from './game';
import Song from './song';
import Menu from './menu';

document.addEventListener("DOMContentLoaded", () => {
  const text = "I had seen little of Holmes lately. My marriage had drifted us away from each other. My own complete happiness, and the home-centred interests which rise up around the man who first finds himself master of his own establishment, were sufficient to absorb all my attention, while Holmes, who loathed every form of society with his whole Bohemian soul, remained in our lodgings in Baker Street, buried among his old books, and alternating from week to week between cocaine and ambition, the drowsiness of the drug, and the fierce energy of his own keen nature."
  // const menu = new Menu;
  // menu.draw();

  const song = new Song('assets/test.mp3', 95, 120, 3315, 100, text, 7, 144);
  const game = new Game(song);
  game.startSong();
  game.score();
  window.setInterval( () => {
    game.draw();
  }, 20);
});
