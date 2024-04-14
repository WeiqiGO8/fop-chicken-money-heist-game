// global variable for the background:
let firstLevelBackground;
let secondLevelBackground;

let mainCharacter;
let chickenY = 520;
let chickenX = 110;
let velocity = 1;
let acceleration = 0.1;
let speed = 0;

// load images - variable = loadImage("file-path");
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

function chicken(chickenX, chickenY) {
  // Movement
  //mainCharacter = document.getElementById("imageElement");
  image(mainCharacter, chickenX, chickenY);
  chickenX = chickenX + speed;


  //Move character
  //p5
  /*if (keyIsPressed() && arrowKey.leftArrow) {
    speed = -5;
    console.log("keyispressed");
  } else if (keyIsPressed() && arrowKey.rightArrow) {
    speed = 5;
  } else {
    speed = 0;
  }*/

  //js
 /* mainCharacter.addEventListener("keydown", (event) => {
    if (event.key === arrowKey.leftArrow) {
      speed = -5;
      console.log("Left arrow key is pressed");
    } else if (event.key === arrowKey.rightArrow) {
      speed = 5;
      console.log("Right arrow key is pressed");
    } else {
      speed = 0;
    }
  });*/
}

function setup() {
  let canvas = createCanvas(800, 800);
  // canvas.parent("canvas-holder");
  background(255, 255, 255);
  frameRate(30);
}

function level1() {
  chicken(chickenX, chickenY);
}

function draw() {
  //image(variable, x, y, width, height);
  image(firstLevelBackground, 100, 100, 700, 600);
  level1();
}
