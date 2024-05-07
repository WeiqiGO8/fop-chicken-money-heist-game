//Imports
//import { Platform, platformArray } from "../js/level-1.js";
import { gridData1 } from "../js/tiles.js";
import { gridData2 } from "../js/tiles.js";
//import { PlatformTwo, platformTwoArray } from "../js/level-2.js";
import { Button } from "../js/button.js";
import { TextBox } from "../js/textbox.js";
import { mapTiles } from "../js/tiles.js";

// global variable for the background:
let firstLevelBackground;
let secondLevelBackground;

let state = "startScreen";
let timer = 18;

//Main character variables
let mainCharacter;
let chickenY = 460;
let chickenX = 40;
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

function numberInfo() {
  // the following 2 lines of code was adapted from: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp- - 2024-05-06
  // if (frameCount % 60 === 0 && timer > 0) {
  //   timer--;

  push();
  fill(0, 0, 0);
  text("time", 4, 65);
  text("velocity", 4, 106);

  text(timer, 88, 65);
  text(Math.floor(velocity), 88, 106);
  pop();
}
if (timer === 0) {
  let timerText = new TextBox("Game Over!", 30, 20);
}
// }

function chicken(chickenX, chickenY) {
  image(mainCharacter, chickenX, chickenY, chickenWidth, chickenHeight);
}

// function to make it easier to work with the game - make up for the loss of p5canvas pluggin
// the following 24 lines of code was adapted from:
// https://p5js.org/learn/interactivity.html - 2024-04-12
// https://chat.openai.com/share/9c07c535-912e-48df-9b54-6b2999925ddb - 2024-04-12
function coordinatePointer() {
  // cursor(CROSS);
  textSize(20);
  textStyle(BOLD);

  fill(0, 0, 0);
  text("(" + mouseX + ", " + mouseY + ")", 5, 20);

  line(mouseX, 0, mouseX, height);
  line(0, mouseY, width, mouseY);
}

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
  if (keyCode === arrowKey.spacebarKey || keyCode === arrowKey.upArrow) {
    jump = true;
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

function gravity1() {
  let onPlatform = false; // Flag to check if the chicken is on a platform
  const tileSize = 40;
  const gridX = floor(chickenX / tileSize);
  const gridY = floor((chickenY + chickenHeight) / tileSize);

  // Check collision with each platform
  if (
    gridY < gridData1.length &&
    gridX < gridData1[gridY].length &&
    gridData1[gridY][gridX] === 1
  ) {
    onPlatform = true;
  }

  // Check collision at multiple points along the chicken's height
  /*for (let i = 0; i < chickenHeight; i += tileSize) {
    const gridX = floor(chickenX / tileSize);
    const gridY = floor((chickenY + i) / tileSize);

    if (
      gridY < gridData1.length &&
      gridX < gridData1[gridY].length &&
      gridData1[gridY][gridX] === 1
    ) {
      onPlatform = true;
      break; // Exit the loop if a collision is detected
    }
  }*/

  // Apply gravity and handle jumping
  if (onPlatform) {
    // Reset velocity and jumpCounter when on a platform and not jumping
    if (!jump) {
      velocity = 0;
      jumpCounter = 0;
    } else if (jumpCounter < jumpPower) {
      // Apply upward velocity for jumping
      velocity = -jumpPower;
      jumpCounter++;
    } else {
      // Stop jumping when jumpCounter reaches jumpPower
      velocity = 0;
      jumpCounter = 0;
      jump = false;
    }
  } else {
    // Apply downward velocity when not on a platform
    velocity = fallingSpeed;

    // Handle jumping while in the air
    if (jump && jumpCounter < jumpPower) {
      velocity = -jumpPower;
      jumpCounter++;
    }
  }

  // Update the chicken's position
  chickenY += direction * velocity;

  // Ensure the chicken stays within the canvas boundaries
  chickenY = constrain(chickenY, 0, height - chickenHeight);
}

function gravity2() {
  let onPlatform = false; // Flag to check if the chicken is on a platform
  const tileSize = 40;
  const gridX = floor(chickenX / tileSize);
  const gridY = floor((chickenY + chickenHeight) / tileSize);

  // Check collision with each platform
  if (
    gridY < gridData2.length &&
    gridX < gridData2[gridY].length &&
    gridData2[gridY][gridX] === 1
  ) {
    onPlatform = true;
  }

  // Apply gravity and handle jumping
  if (onPlatform) {
    // Reset velocity and jumpCounter when on a platform and not jumping
    if (!jump) {
      velocity = 0;
      jumpCounter = 0;
    } else if (jumpCounter < jumpPower) {
      // Apply upward velocity for jumping
      velocity = -jumpPower;
      jumpCounter++;
    } else {
      // Stop jumping when jumpCounter reaches jumpPower
      velocity = 0;
      jumpCounter = 0;
      jump = false;
    }
  } else {
    // Apply downward velocity when not on a platform
    velocity = fallingSpeed;

    // Handle jumping while in the air
    if (jump && jumpCounter < jumpPower) {
      velocity = -jumpPower;
      jumpCounter++;
    }
  }

  // Update the chicken's position
  chickenY += direction * velocity;

  // Ensure the chicken stays within the canvas boundaries
  chickenY = constrain(chickenY, 0, height - chickenHeight);
}


window.keyReleased = keyReleased;

function startScreen() {
  if (state === "startScreen") {
    image(
      firstLevelBackground,
      coordinates.x,
      coordinates.y,
      coordinates.width,
      coordinates.height
    );

    let winLoss = new TextBox(80, 320, 400, 80, "Chicken Platform");

    let levelOneButton = new Button(40, 440, 200, 40, "Level 1");
    let levelTwoButton = new Button(320, 440, 200, 40, "Level 2");

    winLoss.draw();
    levelOneButton.draw();
    levelTwoButton.draw();

    mapTiles();
  }
}

//! Not working yet ------------------------------------------------------------
function resultScreen() {
  if (state === "win") {
    image(
      firstLevelBackground,
      coordinates.x,
      coordinates.y,
      coordinates.width,
      coordinates.height
    );
    let winLoss = new TextBox(80, 320, 400, 80, "You Won!");

    let levelOneButton = new Button(40, 440, 200, 40, "Level 1");
    let levelTwoButton = new Button(320, 440, 200, 40, "Level 2");

    winLoss.draw();
    levelOneButton.draw();
    levelTwoButton.draw();
  } else if (state === "loss") {
    image(
      secondLevelBackground,
      coordinates.x,
      coordinates.y,
      coordinates.width,
      coordinates.height
    );
    let winLoss = new TextBox(80, 320, 400, 80, "You Lost!");

    let levelOneButton = new Button(40, 440, 200, 40, "Level 1");
    let levelTwoButton = new Button(320, 440, 200, 40, "Level 2");

    winLoss.draw();
    levelOneButton.draw();
    levelTwoButton.draw();
    mapTiles();
  }
}

function mouseClicked() {
  let levelOneButton = new Button(40, 440, 200, 40, "Level 1");
  let levelTwoButton = new Button(320, 440, 200, 40, "Level 2");

  if (levelOneButton.hitTest(mouseX, mouseY) && state === "startScreen") {
    state = "levelOne";
    levelOne();
    // reset character position
  } else if (
    levelTwoButton.hitTest(mouseX, mouseY) &&
    state === "startScreen"
  ) {
    state = "levelTwo";
    levelTwo();
    // reset character position
  }
}
window.mouseClicked = mouseClicked;

function levelOne() {
  //image(variable, x, y, width, height);
  image(
    firstLevelBackground,
    coordinates.x,
    coordinates.y,
    coordinates.width,
    coordinates.height
  );
  numberInfo();
  chicken(chickenX, chickenY, chickenWidth, chickenHeight);
  movement();
  gravity1();
  mapTiles();
}

function levelTwo() {
  image(
    secondLevelBackground,
    coordinates.x,
    coordinates.y,
    coordinates.width,
    coordinates.height
  );
  numberInfo();
  chicken(chickenX, chickenY);
  movement();
  gravity2();
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

/*for (let i = 0; i < platformArray.length; i++) {
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
  }*/

/*if (onPlatform) {
    if (jump && jumpCounter < jumpPower) {
      velocity = -jumpPower;
      jumpCounter++;
    } else {
      chickenY = gridY * tileSize - chickenHeight;
      jumpCounter = 0;
      velocity = 0;
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
  }*/

  /*function gravity() {
  const tileSize = 40;
  let newY = chickenY + direction * velocity; // Calculate the new Y position after applying gravity

  // Check for collision with each platform
  for (let i = 0; i < gridData1.length; i++) {
    for (let j = 0; j < gridData1[i].length; j++) {
      if (gridData1[i][j] === 1) {
        const platformX = j * tileSize;
        const platformY = i * tileSize;

        // Check if the character's new position would intersect with the platform
        if (
          newY + chickenHeight >= platformY &&
          newY < platformY + tileSize &&
          chickenX >= platformX &&
          chickenX < platformX + tileSize
        ) {
          // If there's an intersection, adjust the character's position to be on top of the platform
          newY = platformY - chickenHeight;
          velocity = 0; // Stop the character's vertical movement
          jumpCounter = 0; // Reset the jump counter
          jump = false; // Reset the jump flag
          break; // Exit the inner loop since we found a collision
        }
      }
    }
  }

  // Apply gravity and handle jumping
  if (!jump) {
    // Apply downward velocity when not jumping
    velocity = fallingSpeed;
  } else if (jumpCounter < jumpPower) {
    // Apply upward velocity for jumping
    velocity = -jumpPower;
    jumpCounter++;
  } else {
    // Stop jumping when jumpCounter reaches jumpPower
    velocity = 0;
    jumpCounter = 0;
    jump = false;
  }

  // Update the chicken's position
  chickenY = newY;

  // Ensure the chicken stays within the canvas boundaries
  chickenY = constrain(chickenY, 0, height - chickenHeight);
}*/
