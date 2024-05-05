//Imports
//import { platform, platformArray } from "./level-1.js";
import { Platform, platformArray } from "../js/level-1.js";
import { PlatformTwo, platformTwoArray } from "../js/level-2.js";
import { mapTiles } from "../js/tiles.js";

// global variable for the background:
let firstLevelBackground;
let secondLevelBackground;
let state = "levelTwo";

//Main character variables
let mainCharacter;
let chickenY = 420;
let chickenX = 30;
let speed = 0;
const chickenWidth = 50;
const chickenHeight = 60;

//Gravity
let jump = false; //Is character jumping?
let direction = 1; // Force of gravity in Y direction
let velocity = 2;
let jumpPower = 10;
let fallingSpeed = 2;
let maxHeight = 50;
let jumpCounter = 0;

// load images - variable = loadImage("file-path");
// preload images --> loadimage - variable = loadImage("file-path");
// use img --> image(variable, x, y, width, height);
function preload() {
  firstLevelBackground = loadImage("img/level-01.png");
  secondLevelBackground = loadImage("img/level-02.png");
  mainCharacter = loadImage("img/chickenPixel.png");
}
window.preload = preload;

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
  x: 0,
  y: 0,
  width: 1366,
  height: 768,
};

/*const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/level-1.png",
});*/

function setup() {
  let canvas = createCanvas(1366, 768);
  canvas.parent("canvas-holder");
  background(255, 255, 255);
  frameRate(30);
}
window.setup = setup;

function chicken(chickenX, chickenY) {
  image(mainCharacter, chickenX, chickenY, chickenWidth, chickenHeight);
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

// Storing the platforms
// Will be moved to level-1 file later, problem with import.

class platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

let platformArray = [
  new platform(0, 460, 125, 30), //Row 1, from the left
  new platform(125, 505, 130, 30),
  new platform(258, 477, 125, 25),
  new platform(384, 505, 157, 34),
  new platform(540, 435, 160, 30),
  new platform(0, 344, 179, 34), //Row 2
  new platform(179, 402, 125, 27),
  new platform(319, 379, 132, 31),
  new platform(451, 439, 65, 22),
  new platform(540, 433, 160, 34),
  new platform(515, 334, 185, 31), //Row 3
  new platform(0, 206, 57, 38), //Row 4
  new platform(117, 214, 134, 36),
  new platform(215, 280, 74, 28),
  new platform(352, 303, 57, 22),
  new platform(515, 255, 59, 22),
  new platform(644, 252, 56, 23),
];

class Ground {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

let groundArray = [];

function movement() {
  chickenX += speed;
  if (keyIsPressed) {
    if (keyCode === arrowKey.leftArrow) {
      speed = -5;
    } else if (keyCode === arrowKey.rightArrow) {
      speed = 5;
    } else {
      speed = 0;
    }
  }
}

function keyPressed() {
  if (keyIsPressed) {
    if (keyCode === arrowKey.leftArrow) {
      speed = -5;
    } else if (keyCode === arrowKey.rightArrow) {
      speed = 5;
    } else {
      speed = 0;
    }

    if (keyCode === arrowKey.spacebarKey || keyCode === arrowKey.upArrow) {
      jump = true;
    }
  }
}

//Reset
function keyReleased() {
  if (keyCode === arrowKey.leftArrow || keyCode === arrowKey.rightArrow) {
    speed = 0;
  }
  if (keyCode === arrowKey.spacebarKey || keyCode === arrowKey.upArrow) {
    jump = false;
  }
}

//https://chat.openai.com/share/28fefe10-0739-4420-8a4c-10edff61a6a8 - 28-04-2024
//

function gravity() {
  chickenX += speed;
  let onPlatform = false; // Flag to check if the chicken is on a platform
  let platformY = chickenY + chickenHeight;

  // Check collision with each platform
  for (let i = 0; i < platformArray.length; i++) {
    let platform = platformArray[i];
    if (
      chickenX + chickenWidth > platform.x &&
      chickenX < platform.x + platform.width &&
      chickenY + chickenHeight >= platform.y &&
      chickenY < platform.y + platform.height
    ) {
      // Chicken is colliding with a platform
      onPlatform = true;
      platformY = platform.y;
      break; // Exit the loop since we don't need to check other platforms
    }
  }

  if (onPlatform) {
    if (jump && jumpCounter < jumpPower) {
      velocity = -jumpPower;
      jumpCounter++;
    } else {
      chickenY = platformY - chickenHeight;
      jumpCounter = 0; // reset jumpCounter
      velocity = 0; // reset velocity
    }
  } else {
    chickenY += direction * velocity;
    if (jump) {
      if (jumpCounter >= jumpPower) {
        velocity = fallingSpeed;
      } else {
        velocity = -jumpPower;
        jumpCounter++;
      }
    } else {
      velocity = fallingSpeed;
    }
  }
}
window.keyReleased = keyReleased;

function levelOne() {
  //image(variable, x, y, width, height);
  image(
    firstLevelBackground,
    coordinates.x,
    coordinates.y,
    coordinates.width,
    coordinates.height
  );
  chicken(chickenX, chickenY, chickenWidth, chickenHeight);
  movement();
  gravity();
  mapTiles();
}

function levelTwo(x, y) {
  image(
    secondLevelBackground,
    coordinates.x,
    coordinates.y,
    coordinates.width,
    coordinates.height
  );
  chicken(chickenX, chickenY);
  movement();
  mapTiles();
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
window.draw = draw;
