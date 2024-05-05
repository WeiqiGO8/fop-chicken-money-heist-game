// level 2
class PlatformTwo {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

let platformTwoArray = [];

// let platformTwoArray = [
//   new PlatformTwo(0, 280, 80, 23), // 1 - 9 -- ground/bottom row and pillars
//   new PlatformTwo(78, 508, 85, 32),
//   new PlatformTwo(163, 481, 72, 25),
//   new PlatformTwo(234, 508, 73, 33),
//   new PlatformTwo(306, 274, 22, 24),
//   new PlatformTwo(383, 507, 25, 34),
//   new PlatformTwo(458, 478, 73, 26),
//   new PlatformTwo(530, 508, 86, 32),
//   new PlatformTwo(616, 275, 84, 26),
//   new PlatformTwo(190, 367, 72, 18), // 10 - 11 -- second row from the bottom
//   new PlatformTwo(430, 336, 73, 16),
//   new PlatformTwo(130, 250, 72, 14), // 12 - 14 -- middle row
//   new PlatformTwo(478, 225, 74, 15),
//   new PlatformTwo(635, 168, 63, 17),
//   new PlatformTwo(0, 170, 70, 14), // 15 - 19 -- top row
//   new PlatformTwo(100, 68, 72, 14),
//   new PlatformTwo(218, 124, 72, 16),
//   new PlatformTwo(342, 157, 73, 15),
//   new PlatformTwo(518, 122, 74, 16),
// ];

export { PlatformTwo, platformTwoArray };
