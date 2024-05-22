import { mapTiles, gridData1, gridData2 } from "./tiles.js";
import { Button } from "./button.js";

// global variable for the images:
let screenBackground;
let firstLevelBackground;
let secondLevelBackground;
let coinImage;
let mainCharacter;
let coinArray1;
let coinArray2;

function preload() {
  screenBackground = loadImage("img/screenbackground.png");
  firstLevelBackground = loadImage("img/level-01.png");
  secondLevelBackground = loadImage("img/level-02.png");
  mainCharacter = loadImage("img/chickenpixel.png");
  coinImage = loadImage("img/coin.png");
}
window.preload = preload;

//variables
let state = "start";
let timer = 30;

//Main character variables
let chickenX = 0;
let chickenY = 560;
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
  x: 0,
  y: 0,
  width: 1366,
  height: 768,
};

class Coin {
  constructor(coinImage, x, y, width, height) {
    this.coinImage = coinImage;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

function drawCoins() {
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

function setup() {
  let canvas = createCanvas(1366, 768);
  canvas.parent("canvas-holder");
  background(255, 255, 255);
  frameRate(30);
  drawCoins();
}
window.setup = setup;

function chicken(chickenX, chickenY) {
  image(mainCharacter, chickenX, chickenY, chickenWidth, chickenHeight);
}

// The following function was adapted from:
// https://stackoverflow.com/questions/35973441/how-to-horizontally-flip-an-image - 2024-05-13

let isFlipped = false;

function flipChicken(mainCharacter, x, y) {
  push();
  clear();
  if (state === "levelOne") {
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
window.keyPressed = keyPressed;

//Reset
function keyReleased() {
  if (keyCode === arrowKey.leftArrow || keyCode === arrowKey.rightArrow) {
    speed = 0;
  }
  if (keyCode === arrowKey.spacebarKey || keyCode === arrowKey.upArrow) {
    jump = false;
  }
}
window.keyReleased = keyReleased;

// The gravity function was adapted from this chatgpt conversation.
// https://chatgpt.com/share/28fefe10-0739-4420-8a4c-10edff61a6a8 -21-05-2024
// Adjusting platform detection to only the top of the tile, not using the horizontal movement code.
// https://chat.openai.com/share/c164b996-7fff-494f-bc73-7e127d1b5ae1 -16-05-2024

//Gravity & Jumping
function gravity(gridData) {
  let onPlatform = false;
  const tileSize = 40;
  const gridX = floor((chickenX + chickenWidth) / tileSize);
  const gridY = floor((chickenY + chickenHeight) / tileSize);

  // Platform collision
  if (
    gridY < gridData.length &&
    gridX < gridData[gridY].length &&
    gridData[gridY][gridX] === 1 &&
    chickenY + chickenHeight <= gridY * tileSize + velocity
  ) {
    onPlatform = true;
    chickenY = gridY * tileSize - chickenHeight; // Position chicken on top of the tile
    velocity = 0;
    jumpCounter = 0;
  } else {
    velocity += fallingSpeed * acceleration;
    onPlatform = false;
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

// The ground function was adjusted by suggestion from chatgpt to separate the logic for collision between the left and the right side.
// https://chatgpt.com/share/848773a4-be5d-45b7-8c2d-18d9d48d69c3 -22-05-2024

function ground(gridData) {
  const tileSize = 40;
  const gridX = Math.floor(chickenX / tileSize);
  const gridY = Math.floor((chickenY + chickenHeight) / tileSize);

  //console.log('chickenX:', chickenX);
  //console.log('chickenWidth:', chickenWidth);
  console.log("gridX:", gridX);
  //console.log('tileSize:', tileSize);
  //console.log('speed:', speed);

  if (
    gridY < gridData.length &&
    gridX < gridData[gridY].length &&
    gridData[gridY][gridX] === 2
  ) {
    // Check for right collision
    if (speed > 0 && chickenX + chickenWidth > gridX * tileSize) {
      chickenX = gridX * tileSize - chickenWidth;
      console.log("Right collision");
    } else if (speed < 0 && chickenX < (gridX + 1) * tileSize) {
      // Left collision
      chickenX = (gridX + 1) * tileSize;
    }
  }
}

// Line 262 to 279 is adapted from the following scource.
//https://www.youtube.com/watch?v=_sIm4LCiR0c timestamp: 13:09, 20-05-2024

let coinCounter = 0;
function collectCoins(coinArray) {
  for (let index = coinArray.length - 1; index > -1; --index) {
    let coin = coinArray[index];
    if (
      chickenX < coin.x + coin.width &&
      chickenX + chickenWidth > coin.x &&
      chickenY < coin.y + coin.height &&
      chickenY + chickenHeight > coin.y
    ) {
      {
        coinArray.splice(index, 1);
        coinCounter++;
      }
    }
  }
  text(coinCounter, 88, 106);
}

function startScreen() {
  if (state === "start") {
    image(
      screenBackground,
      coordinates.x,
      coordinates.y,
      coordinates.width,
      coordinates.height
    );

    let winLoss = new Button(480, 320, 400, 80, "Chicken Platform");
    let startLevelOneButton = new Button(560, 440, 240, 40, "Level 1");

    winLoss.draw();
    startLevelOneButton.draw();
    mapTiles();
  }
}

function numberInfo() {
  // the following 6 lines of code was adapted from: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp- - 2024-05-06
  if (frameCount % 30 === 0 && timer > 0) {
    timer--;
  }
  if (timer === 0) {
    state = "loss";
  }
  push();
  fill(0, 0, 0);
  text("time", 4, 65);
  text("coins", 4, 106);

  text(timer, 88, 65);
  fill(0, 0, 0);
  text(coinCounter, 88, 106);
  pop();
}

function resultScreen() {
  image(
    screenBackground,
    coordinates.x,
    coordinates.y,
    coordinates.width,
    coordinates.height
  );

  if (state === "win") {
    let winLoss = new Button(480, 320, 400, 80, "You Won!");

    let levelOneButton = new Button(440, 440, 200, 40, "Level 1");
    let levelTwoButton = new Button(720, 440, 200, 40, "Level 2");

    winLoss.draw();
    levelOneButton.draw();
    levelTwoButton.draw();
    mapTiles();
  } else if (state === "loss") {
    let winLoss = new Button(480, 320, 400, 80, "You Lost!");
    let startLevelOneButton = new Button(560, 440, 240, 40, "Level 1");

    winLoss.draw();
    startLevelOneButton.draw();
    mapTiles();
  }
}

function mouseClicked() {
  let startLevelOneButton = new Button(560, 440, 240, 40, "Level 1");
  let levelOneButton = new Button(440, 440, 200, 40, "Level 1");
  let levelTwoButton = new Button(720, 440, 200, 40, "Level 2");

  if (
    (startLevelOneButton.hitTest(mouseX, mouseY) && state === "start") ||
    (startLevelOneButton.hitTest(mouseX, mouseY) && state === "loss") ||
    (levelOneButton.hitTest(mouseX, mouseY) && state === "win")
  ) {
    timer = 30;
    coinCounter = 0;
    chickenX = 0;
    chickenY = 560;
    state = "levelOne";
    drawCoins();
  } else if (levelTwoButton.hitTest(mouseX, mouseY) && state === "win") {
    timer = 30;
    coinCounter = 0;
    chickenX = 40;
    chickenY = 320;
    state = "levelTwo";
    drawCoins();
  }
}
window.mouseClicked = mouseClicked;

function levelOne() {
  image(
    firstLevelBackground,
    coordinates.x,
    coordinates.y,
    coordinates.width,
    coordinates.height
  );
  chicken(chickenX, chickenY);
  movement();
  ground(gridData1);
  gravity(gridData1);
  mapTiles();
  for (let coin of coinArray1) {
    image(coin.coinImage, coin.x, coin.y, coin.width, coin.height);
  }
  numberInfo();
  collectCoins(coinArray1);
  if (coinCounter === 8) {
    state = "win";
  }
}

function levelTwo() {
  image(
    secondLevelBackground,
    coordinates.x,
    coordinates.y,
    coordinates.width,
    coordinates.height
  );
  chicken(chickenX, chickenY);
  movement();
  gravity(gridData2);
  mapTiles();
  for (let coin of coinArray2) {
    image(coin.coinImage, coin.x, coin.y, coin.width, coin.height);
  }
  numberInfo();
  collectCoins(coinArray2);
  if (coinCounter === 5) {
    state = "win";
  }
  ground(gridData2);
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
}
window.draw = draw;
