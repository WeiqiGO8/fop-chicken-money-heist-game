import { mapTiles, gridData1, gridData2 } from "./tiles.js";
import { Button } from "./button.js";
import { TextBox } from "./textbox.js";

// global variable for the images:
let firstLevelBackground;
let secondLevelBackground;
let coinImage;
let mainCharacter;
let enemyCharacter;

// load images - variable = loadImage("file-path");
// preload images --> loadimage - variable = loadImage("file-path");
// use img --> image(variable, x, y, width, height);
function preload() {
  firstLevelBackground = loadImage("img/level-01.png");
  secondLevelBackground = loadImage("img/level-02.png");
  mainCharacter = loadImage("img/chickenpixel.png");
  //enemyCharacter = loadImage("img/henPixel.png");
  coinImage = loadImage("img/coin.png");
}
window.preload = preload;

//variables
let state = "win";
let timer = 30;

//Main character variables
let chickenY = 560;
let chickenX = 0;
let speed = 0;
const chickenWidth = 40;
const chickenHeight = 40;

//Gravity variables
let jump = false;
let direction = 1;
let velocity = 5;
let jumpPower = 15;
let maxJumps = 2;
let fallingSpeed = 1;
let acceleration = 0.3;
let jumpCounter = 0;

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

class Coin {
  constructor(coinImage, x, y, width, height) {
    this.coinImage = coinImage;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

let coinArray1;
let coinArray2;

function setup() {
  let canvas = createCanvas(1366, 768);
  canvas.parent("canvas-holder");
  background(255, 255, 255);
  frameRate(30);

  coinArray1 = [
    new Coin(coinImage, 240, 200, 40, 40),
    new Coin(coinImage, 1040, 240, 40, 40),
    new Coin(coinImage, 1320, 360, 40, 40),
    new Coin(coinImage, 920, 520, 40, 40),
    new Coin(coinImage, 80, 360, 40, 40),
    new Coin(coinImage, 600, 320, 40, 40),
    new Coin(coinImage, 760, 600, 40, 40),
    new Coin(coinImage, 280, 520, 40, 40),
  ];

  coinArray2 = [
    new Coin(coinImage, 1080, 40, 40, 40),
    new Coin(coinImage, 200, 560, 40, 40),
    new Coin(coinImage, 920, 360, 40, 40),
    new Coin(coinImage, 200, 200, 40, 40),
    new Coin(coinImage, 600, 40, 40, 40),
  ];
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
  // cursor(CROSS);
  textSize(20);
  textStyle(BOLD);

  fill(0, 0, 0);
  text("(" + mouseX + ", " + mouseY + ")", 5, 20);

  line(mouseX, 0, mouseX, height);
  line(0, mouseY, width, mouseY);
}

// The following function was adapted from:
// https://stackoverflow.com/questions/35973441/how-to-horizontally-flip-an-image - 2024-05-13

let isFlipped = false;

function flipChicken(mainCharacter, x, y) {
  push();
  clear();
  if (state === "levelOne") {
    // Solve issue with background being redrawn.
    image(
      firstLevelBackground,
      coordinates.x,
      coordinates.y,
      coordinates.width,
      coordinates.height
    );
  } else if (state === "levelTwo") {
    image(
      secondLevelBackground,
      coordinates.x,
      coordinates.y,
      coordinates.width,
      coordinates.height
    );
  }
  if (isFlipped) {
    translate(x + mainCharacter.width, y);
    scale(-1, 1);
    image(mainCharacter, 0, 0, chickenWidth, chickenHeight);
  } else {
    image(mainCharacter, x, y, chickenWidth, chickenHeight);
  }
  pop();
}

//Side movement
function movement() {
  chickenX += speed;
  if (keyIsPressed) {
    if (keyCode === arrowKey.leftArrow) {
      speed = -5;
      if (!isFlipped) {
        isFlipped = true;
      }
    } else if (keyCode === arrowKey.rightArrow) {
      speed = 5;
      if (isFlipped) {
        isFlipped = false;
      }
    } else {
      speed = 0;
    }
  }

  flipChicken(mainCharacter, chickenX, chickenY);
}


// Was advised during the lab session to add the keyPressed function to help with some movement issues. 16-05-2024
function keyPressed() {
  if (
    (jumpCounter < maxJumps && keyCode === arrowKey.spacebarKey) ||
    keyCode === arrowKey.upArrow
  ) {
    if (!jump) {
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

//Gravity & Jumping
function gravity(gridData) {
  let onPlatform = false;
  const tileSize = 40;
  const gridX = floor(chickenX / tileSize);
  const gridY = floor((chickenY + chickenHeight) / tileSize);

  // Platform collision
  if (
    gridY < gridData.length &&
    gridX < gridData[gridY].length &&
    gridData[gridY][gridX] === 1
  ) {
    onPlatform = true;
  }

  if (onPlatform) {
    velocity = 0;
    jumpCounter = 0;
  } else {
    velocity += fallingSpeed * acceleration;
  }

  if (jump && jumpCounter < maxJumps) {
    velocity = -jumpPower;
    jumpCounter++;
    jump = false;
  }

  // Update the chicken's position
  chickenY += direction * velocity;

  // Edges of the canvas
  chickenY = constrain(chickenY, 0, height - chickenHeight);
  chickenX = constrain(chickenX, 0, width - chickenWidth);

  // Check if chicken is falling below the platform
  if (!onPlatform) {
    velocity += fallingSpeed;
  }
}

/*let coinCollected = false;
function collectCoins(gridData) {
  tileSize = 40;
  gridX = floor(chickenX / tileSize);
  gridY = floor((chickenY + chickenHeight) / tileSize);

  if (
    gridY < gridData.length &&
    gridX < gridData[gridY].length &&
    gridData[gridY][gridX] === 3
  ) {
    coinCollected = true;
  }

  if (coinCollected) {
    this.coinImage.remove();
  }
}*/

/*let coinCollected = false;
function collectCoins(gridData) {
  tileSize = 40;
  gridX = floor(chickenX / tileSize);
  gridY = floor((chickenY + chickenHeight) / tileSize);

  if (
    gridY < gridData.length &&
    gridX < gridData[gridY].length &&
    gridData[gridY][gridX] === 3
  ) {
    coinCollected = true;
  }

  if (coinCollected) {
    this.coinImage.remove();
  }
}*/

window.keyPressed = keyPressed;
window.keyReleased = keyReleased;

function startScreen() {
  if (state === "start") {
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

function numberInfo() {
  // the following 2 lines of code was adapted from: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp- - 2024-05-06
  if (frameCount % 30 === 0 && timer > 0) {
    timer--;
  }
  if (timer === 0) {
    state = "loss";
  }
  push();
  fill(0, 0, 0);
  text("time", 4, 65);
  text("velocity", 4, 106);
  text("coins", 4, 145);

  text(timer, 88, 65);
  text(Math.floor(velocity), 88, 106);
  if (state === "levelOne") {
    text(coinArray1.length, 88, 145);
  } else if (state === "levelTwo") {
    text(coinArray2.length, 88, 145);
  }
  pop();
}

function resultScreen() {
  if (state === "win") {
    image(
      secondLevelBackground,
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
    mapTiles();
  } else if (state === "loss") {
    image(
      firstLevelBackground,
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

  if (
    (levelOneButton.hitTest(mouseX, mouseY) && state === "start") ||
    (levelOneButton.hitTest(mouseX, mouseY) && state === "win") ||
    (levelOneButton.hitTest(mouseX, mouseY) && state === "loss")
  ) {
    timer = 30;
    state = "levelOne";
    // reset character position
  } else if (
    (levelTwoButton.hitTest(mouseX, mouseY) && state === "start") ||
    (levelTwoButton.hitTest(mouseX, mouseY) && state === "win") ||
    (levelTwoButton.hitTest(mouseX, mouseY) && state === "loss")
  ) {
    timer = 30;
    state = "levelTwo";
    // reset character position
  }
}
window.mouseClicked = mouseClicked;

//let startpositionY1 = 560;
//let startpositionX1 = 0;

function levelOne() {
  //chickenX = startpositionX1;
  //chickenY = startpositionY1;
  image(
    firstLevelBackground,
    coordinates.x,
    coordinates.y,
    coordinates.width,
    coordinates.height
  );
  chicken(chickenX, chickenY);
  movement();
  gravity(gridData1);
  mapTiles();
  for (let coin of coinArray1) {
    image(coin.coinImage, coin.x, coin.y, coin.width, coin.height);
  }
  numberInfo();
  //collectCoins(gridData1);
}

//let startpositionY2 = 320;
//let startpositionX2 = 0;

function levelTwo() {
  //chickenX = startpositionX2;
  //chickenY = startpositionY2;
  image(
    secondLevelBackground,
    coordinates.x,
    coordinates.y,
    coordinates.width,
    coordinates.height
  );
  //image(enemyCharacter,x,y,w)
  chicken(chickenX, chickenY);
  movement();
  gravity(gridData2);
  mapTiles();
  for (let coin of coinArray2) {
    image(coin.coinImage, coin.x, coin.y, coin.width, coin.height);
  }
  numberInfo();
  //collectCoins(gridData2);
}

function draw() {
  clear();
  if (state === "start") {
    startScreen();
  } else if (state === "levelOne") {
    levelOne();
  } else if (state === "levelTwo") {
    levelTwo();
  } else if (state === "win" || state === "loss") {
    resultScreen();
  }

  coordinatePointer(); // makes the exact coordinates of the canvas visible with mouse
}

window.draw = draw;


//old gravity function incase i need it
//Gravity & Jumping
/*function gravity(gridData) {
  let onPlatform = false;
  const tileSize = 40;
  const gridX = floor(chickenX / tileSize);
  const gridY = floor((chickenY + chickenHeight) / tileSize);

  // Platform collision
  if (
    gridY < gridData.length &&
    gridX < gridData[gridY].length &&
    gridData[gridY][gridX] === 1
  ) {
    onPlatform = true;
  }

  if (onPlatform) {
    if (!jump) {
      velocity = 0;
      jumpCounter = 0;
    } else if (jumpCounter < maxJumps) {
      velocity -= jumpPower;
      jumpCounter++;
    } else {
      velocity = 0;
      jumpCounter = 0;
      jump = false;
    }
  } else if (!onPlatform) {
    velocity += fallingSpeed;
  }

  if (jump && jumpCounter < maxJumps) {
    velocity -= jumpPower;
    jumpCounter++;
  } else if (jump && !onPlatform) {
    velocity = 0;
    velocity += fallingSpeed;
  }

  // Update the chicken's position
  chickenY += direction * velocity;

  // Edges of the canvas
  chickenY = constrain(chickenY, 0, height - chickenHeight);
  chickenX = constrain(chickenX, 0, width - chickenWidth);
}*/