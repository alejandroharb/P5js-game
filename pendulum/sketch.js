var pivot_x = 300
var pivot_y = 100
var len = 250;
var angle = 0;
// var angle = Math.PI/4 * 1;
var gravity= 0.01;
var acc;
var vel;
var hits = 0;
var jit = 10;

var pinata;
var spr2;
function setup() {
  createCanvas(600, 600);

  // ellipseMode(RADIUS)
  line(pivot_x, pivot_y, 300, 250);
  pinata = createSprite(pivot_x, pivot_y, 50, 50);
  pinata.draw = function() {fill(125, 125), stroke(0, 125, 235), strokeWeight(2),ellipse(0, 0, 40, 90)}
  pinata.shapeColor = color(0, 100);
  pinata.velocity.y = 0;
  pinata.velocity.x = 0;

  bat = createSprite(600, 500, 20, 300);
  bat.shapeColor = color(128);
  spr2 = createSprite(0, 0, 10, 10);
  spr2.shapeColor = color(128);
}

function draw() {
  background(50);
  // reference pivot point - not needed
  ellipse(300, 100, 5, 5);

  spr2.position.x = mouseX;
  spr2.position.y = mouseY;
  // spr2.displace(pinata);

  // overlap has been set to be active when pinata is max 5 degrees from equilibrium position
 if (angle < abs(Math.PI/36)) {

  if (spr2.overlap(pinata)) {
    pinata.shapeColor = color(255);
    // angle set to 45 after hit/overlap/collision occurs

    // set math here:
    // speed from bat (verctor if pinata designed in sections)
    // translate speed to angle, add delayed reaction if needed
    angle = -Math.PI/4 * 1;
    console.log("show stats of swing or damage caused to pinata")

    // remove pinata at some point
    hits++;
    console.log("number of hits: " + hits);

  }
  else {
    pinata.shapeColor = color(0);
  }
 }

  // what happens after screwing up pinata
  if (hits >= 4) {
      pinata.remove();

      // replace here with broken pinata
      pinata.velocity.x = 0;
      pinata.velocity.y = 0;
      line(300, pivot_y, 300, 350);
      // pinata.draw = function() {ellipse(0, 0, 5, 5)}
    } else {
  // if (angle != 0) {
    pinataSwing()
  // }
  }

  drawSprites();
}

function pinataSwing() {
    console.log("Find rotate option of pinata")
    acc = -gravity*sin(angle);
    // console.log("acc: " + acc)

    // rotating object to align with rope plus some jittering - fix jittering to re-start after every hit
    if (angle != 0) {
      pinata.rotation = -(angle*180/PI) + random(-jit, jit);
      jit *= 0.995;
    }

    pinata.velocity.y += acc;
    pinata.velocity.y *= 0.99;
    // console.log("vel-y: " + pinata.velocity.y)
    angle += pinata.velocity.y;
    pinata.position.x = pivot_x + len*sin(angle);
    pinata.position.y = pivot_y + len*cos(angle);
    line(pivot_x, pivot_y, pinata.position.x + random(-1, 1), pinata.position.y);
    pinata.addSpeed(pinata.velocity.y, acc);

}
