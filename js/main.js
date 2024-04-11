// global variable for the background:
let firstLevelBackground;
let secondLevelBackground;

// load images - variable = loadImage("file-path");
function preload() {
  firstLevelBackground = loadImage("img/level-1.png");
  secondLevelBackground = loadImage("img/level-2.png");
}

// objects
const backgroundPlacement = {
  backgroundX: 100,
  backgroundY: 100,
  backgroundW: 700,
  backgroundH: 600,
};
const characterPlacement = {
  // chickenX:,
  // chickenY:,
  // chickenScale:
};

const arrowKey = {
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  leftArrow: 37,
  spacebarKey: 32,
  enterKey: 13,
  escKey: 27,
};

function setup() {
  let canvas = createCanvas(800, 800);
  // canvas.parent("canvas-holder");
  background(255, 255, 255);
  frameRate(30);
}

function draw() {
  //image(variable, x, y, width, height);
  image(firstLevelBackground, 100, 100, 700, 600);
}
