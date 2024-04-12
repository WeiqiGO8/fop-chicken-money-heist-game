// global variable for the background:
let firstLevelBackground;
let secondLevelBackground;
let state = "levelOne";

// preload images --> loadimage - variable = loadImage("file-path");
// use img --> image(variable, x, y, width, height);
function preload() {
  firstLevelBackground = loadImage("img/level-1.png");
  secondLevelBackground = loadImage("img/level-2.png");
}

// objects
const arrowKey = {
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  leftArrow: 37,
  spacebarKey: 32,
  enterKey: 13,
  escKey: 27,
};

const coordinates = {
  //canvas xywh
  backgroundX: 0,
  backgroundY: 0,
  backgroundW: 700,
  backgroundH: 600,

  // borders xywh

  //character xy, scale
  // chickenX:,
  // chickenY:,
  // chickenScale:
};

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("canvas-holder");
  background(255, 255, 255);
  frameRate(30);
}

// function to make it easier to work with the game - make up for the loss of p5canvas pluggin
// the following 24 lines of code was adapted from:
// https://p5js.org/learn/interactivity.html - 2024-04-12
// https://chat.openai.com/share/9c07c535-912e-48df-9b54-6b2999925ddb - 2024-04-12
function coordinatePointer() {
  cursor(CROSS);
  textSize(20);
  textStyle(BOLD);

  fill(0, 0, 0);
  text("(" + mouseX + ", " + mouseY + ")", 5, 20);

  line(mouseX, 0, mouseX, height);
  line(0, mouseY, width, mouseY);
}

function levelOne(x, y) {
  //image(variable, x, y, width, height);
  image(
    firstLevelBackground,
    coordinates.backgroundX,
    coordinates.backgroundY,
    coordinates.backgroundW,
    coordinates.backgroundH
  );
}

function levelTwo(x, y) {
  image(
    secondLevelBackground,
    coordinates.backgroundX,
    coordinates.backgroundY,
    coordinates.backgroundW,
    coordinates.backgroundH
  );
}

function draw() {
  clear();
  if (state === "startScreen") {
    startScreen();
  } else if (state === "levelOne") {
    levelOne();
  } else if (state === "levelTwo") {
    levelTwo();
  } else if (state === "resultScreen") {
    resultScreen();
  }

  coordinatePointer(); // makes the exact coordinates of the canvas visible with mouse
}
