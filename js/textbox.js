class TextBox {
  constructor(x, y, width, height, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
  }

  draw() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill("#ffffff");
    rect(0, 0, this.width, this.height);
    //define text
    noStroke();
    fill("#000000");
    textSize(this.height / 2);
    textAlign(CENTER);
    text(this.text, 0, this.height / 4, this.width);
    pop();
  }
}

export { TextBox };
