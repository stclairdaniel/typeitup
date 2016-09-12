class Menu {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  draw() {
    const baseImage = new Image();
    baseImage.onload = () => {
      this.ctx.font = "24px 'Anonymous Pro', monospace";
      this.ctx.fillText("Type It Up!", 50, 40);
      this.ctx.fillText("Select Difficulty", 50, 80);
      this.ctx.fillText("Easy (24 WPM)", 50, 100);
      this.ctx.fillText("Medium", 50, 120);
      this.ctx.fillText("Hard", 50, 140);
    };
    baseImage.src = 'assets/background.jpg';
  }
}
 export default Menu;
