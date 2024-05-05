//level 1

//Storing the platforms
class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

let platformArray = [
  new Platform(0, 460, 125, 30), //Row 1, from the left
  new Platform(125, 505, 130, 30),
  new Platform(258, 477, 125, 25),
  new Platform(384, 505, 157, 34),
  new Platform(540, 435, 160, 30),
  new Platform(0, 344, 179, 34), //Row 2
  new Platform(179, 402, 125, 27),
  new Platform(319, 379, 132, 31),
  new Platform(451, 439, 65, 22),
  new Platform(540, 433, 160, 34),
  new Platform(515, 334, 185, 31), //Row 3
  new Platform(0, 206, 57, 38), //Row 4
  new Platform(117, 214, 134, 36),
  new Platform(215, 280, 74, 28),
  new Platform(352, 303, 57, 22),
  new Platform(515, 255, 59, 22),
  new Platform(644, 252, 56, 23),
];

//Export platform class + array
export { Platform, platformArray };






/*//Row 1
let platform1 = new platform(0, 460, 125, 30);
let platform2 = new platform(125, 505, 130, 30);
let platform3 = new platform(258, 477, 125, 25);
let platform4 = new platform(384, 505, 157, 34);
let platform5 = new platform(540, 435, 160, 30);
//Row 2
let platform6 = new platform(0, 344, 179, 34);
let platform7 = new platform(179, 402, 125, 27);
let platform8 = new platform(319, 379, 132, 31);
let platform9 = new platform(451, 439, 65, 22);
let platform10 = new platform(540, 433, 160, 34);
//Row 3
let platform11 = new platform(515, 334, 185, 31);
//Row 4
let platform12 = new platform(0, 206, 57, 38);
let platform13 = new platform(117, 214, 134, 36);
let platform14 = new platform(215, 280, 74, 28);
let platform15 = new platform(352, 303, 57, 22);
let platform16 = new platform(515, 255, 59, 22);
let platform17 = new platform(644, 252, 56, 23); */
