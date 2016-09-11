class GameView {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  drawBackground () {
    const baseImage = new Image();
    baseImage.onload = () => {
      this.ctx.drawImage(baseImage, 0, 0);
    };
    baseImage.src = 'assets/background.jpg';
  }
}

export default GameView;
