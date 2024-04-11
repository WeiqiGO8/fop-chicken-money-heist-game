let firstLevelBackground;
let secondLevelBackground;

// load images - variable = loadImage("file-path");
function preload() {
  firstLevelBackground = loadImage(
    "img/level-1.png",
    (img) => {
      console.log("HELLO");
    },
    (event) => {
      console.log("ERROR");
      console.log(event);
    }
  );
  secondLevelBackground = loadImage("img/level-2.png");
}

function setup() {
  let canvas = createCanvas(600, 700);
  // canvas.parent("canvas-holder");
  background(255, 255, 255);
  frameRate(30);
}

//image(variable, x, y, width, height);
function draw() {
  image(firstLevelBackground, 100, 100);
}
