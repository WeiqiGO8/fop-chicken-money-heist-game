// level 2
class platformTwo {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

let platformTwoArray = [
  new platformTwo(0, 280, 80, 23), // 1 - 9 -- ground/bottom row and pillars
  new platformTwo(78, 508, 85, 32),
  new platformTwo(163, 481, 72, 25),
  new platformTwo(234, 508, 73, 33),
  new platformTwo(306, 274, 22, 24),
  new platformTwo(383, 507, 25, 34),
  new platformTwo(458, 478, 73, 26),
  new platformTwo(530, 508, 86, 32),
  new platformTwo(616, 275, 84, 26),
  new platformTwo(190, 367, 72, 18), // 10 - 11 -- second row from the bottom
  new platformTwo(430, 336, 73, 16),
  new platformTwo(130, 250, 72, 14), // 12 - 14 -- middle row
  new platformTwo(478, 225, 74, 15),
  new platformTwo(635, 168, 63, 17),
  new platformTwo(0, 170, 70, 14), // 15 - 19 -- top row
  new platformTwo(100, 68, 72, 14),
  new platformTwo(218, 124, 72, 16),
  new platformTwo(342, 157, 73, 15),
  new platformTwo(518, 122, 74, 16),
];

export { platformTwo, platformTwoArray };
