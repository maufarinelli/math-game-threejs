import Box from "../src/components/3D/Box/Box";

export const boxAdjacent = Box();
boxAdjacent.position.y = 0.0005;
boxAdjacent.position.x = 0;
boxAdjacent.position.z = -1.5;

export const boxNotAdjacent = Box();
boxNotAdjacent.position.y = 0.0005;
boxNotAdjacent.position.x = -4.5;
boxNotAdjacent.position.z = 0;

export const box1 = Box();
box1.position.y = 0.0005;
box1.position.x = 0;
box1.position.z = -1.5;

export const box2 = Box();
box2.position.y = 0.0005;
box2.position.x = -4.5;
box2.position.z = 0;

export const boxHole = Box();
boxHole.position.y = 0.0005;
boxHole.position.x = -4.5;
boxHole.position.z = 0;
boxHole.userData.isHole = true;

export const boxWithSpider1 = Box();
boxWithSpider1.position.y = 0.0005;
boxWithSpider1.position.x = 0;
boxWithSpider1.position.z = -1.5;
boxWithSpider1.userData.hasSpider = true;

export const boxWithSpider2 = Box();
boxWithSpider2.position.y = 0.0005;
boxWithSpider2.position.x = -4.5;
boxWithSpider2.position.z = 0;
boxWithSpider2.userData.hasSpider = true;

export const boxWithSpider3 = Box();
boxWithSpider3.position.y = 0.0005;
boxWithSpider3.position.x = -4.5;
boxWithSpider3.position.z = 0;
boxWithSpider3.userData.hasSpider = true;
