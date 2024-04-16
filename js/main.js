// global variable for the background:
let firstLevelBackground;
let secondLevelBackground;
let state = "levelOne";

//Main character variables
let mainCharacter;
let chickenY = 420;
let chickenX = 30;
let speed = 0;
const g = 1; // Gravity
const jump = 20; // Jump power
let ground;
let velocity = 0;
const size = 20;

// load images - variable = loadImage("file-path");
// preload images --> loadimage - variable = loadImage("file-path");
// use img --> image(variable, x, y, width, height);
function preload() {
  firstLevelBackground = loadImage("img/level-1.png");
  secondLevelBackground = loadImage("img/level-2.png");
  mainCharacter = loadImage("img/chickenPixel.png");
}

// objects
const backgroundPlacement = {
  backgroundX: 100,
  backgroundY: 100,
  backgroundW: 700,
  backgroundH: 600,
};

const characterPlacement = {
  chickenX: 110,
  chickenY: 520,
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


/*const platforms = {
  platform1: { x: 0, y: 460, width: 125, height: 30 }, //Lower row 1
  platform2: { x: 125, y: 505, width: 125, height: 30 }, //Lower row 2
}*/

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("canvas-holder");
  background(255, 255, 255);
  frameRate(30);
}

function chicken(chickenX, chickenY) {
  //mainCharacter = document.getElementById("imageElement");
  image(mainCharacter, chickenX, chickenY);
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

//https://editor.p5js.org/tnishida/sketches/Wv_-BBBaA - 2024-04-16
// Jump movement was modified from this code
function jumpMovement() {
  chickenY += velocity;

  if (chickenY < platforms - size / 2) {
    // in the air
    velocity += g;
  } else {
    velocity = 0;
    chickenY = platforms - size / 2;
  }

  if (chickenY >= platforms - size / 2) {
    // on the ground
    velocity = -jump;
  }
}

function movement() {
  chickenX += speed;
  if (keyIsPressed) {
    if (keyCode === arrowKey.spacebarKey || arrowKey.upArrow) {
      jumpMovement();
      /*chickenY += velocity;
      velocity += acceleration;
      gravity += jumpHeight;*/
    }
    if (keyCode === arrowKey.leftArrow) {
      speed = -5;
    } else if (keyCode === arrowKey.rightArrow) {
      speed = 5;
    } else {
      speed = 0;
    }
  }
}

function keyReleased() {
  if (keyCode === arrowKey.leftArrow || keyCode === arrowKey.rightArrow) {
    speed = 0;
  }
}

function levelOne() {
  //image(variable, x, y, width, height);
  image(
    firstLevelBackground,
    coordinates.backgroundX,
    coordinates.backgroundY,
    coordinates.backgroundW,
    coordinates.backgroundH
  );
  chicken(chickenX, chickenY);
  movement();
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
