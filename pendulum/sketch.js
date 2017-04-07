// pendulum 
var pivot_x = 250;
var pivot_y = 20;
var len = 250;
var angle = 0;
// var angle = Math.PI/4 * 1;
var gravity= 0.01;
var acc;
var vel;
var hits = 0;
var jit = 10;
var pinata;

//-------------Spring--------------
// Spring drawing constants for top bar
var ready = true;
var springHeight = 32,
    left,
    right,
    maxHeight = 300,
    minHeight = 100,
    over = false,
    move = false;

// Spring simulation constants
var M = 8,  // Mass
    K = 0.2,  // Spring constant
    D = 0.98; // Damping
    // R = 0;

// Spring simulation variables
var ps = 0,   // Position   ps = R,
    vs = 0.0, // Velocity
    as = 0,   // Acceleration
    f = 0;    // Force

function preload() {
  arm = loadImage('arm125.png')
}

function setup() {
  createCanvas(600, 600);

  // ellipseMode(RADIUS)
  line(pivot_x, pivot_y, 300, 250);
  pinata = createSprite(pivot_x, pivot_y, 50, 50);
  pinata.draw = function() {fill(125, 125), stroke(0, 125, 235), strokeWeight(2),ellipse(0, 0, 40, 90)}
  pinata.shapeColor = color(0, 100);
  pinata.velocity.y = 0;
  pinata.velocity.x = 0;

  // bat
  bat = createSprite(500, 450, 20, 200);
  bat.shapeColor = color(128);
  bat.addImage(arm)
  bat.velocity.x = 0;
  
  // pull
  pull = -200;
  
  // testing collision sprite
  spr2 = createSprite(0, 0, 20, 20);
  spr2.shapeColor = color(128);
}

// bat hit function triggered by mouse press
function hit() {
  if (mouseIsPressed) {
    // random cord length
    // len += random(-10, 40)
  
    // bat forward x and some up/down y position change
  bat.position.x += random(0, -50);
  bat.position.y += random(-10, 20)
  bat.rotation = -20;
} else {
  // return to original position
  bat.rotation = 10;
  bat.position.x = 500;
  bat.position.y = 400
  len = 250;
}
}

// *************************** //

function draw() {
  background(50);
  // reference pivot point - not needed
  ellipse(250, 20, 5, 5);
  // reference equil point - not needed
  ellipse(250, len + 20, 5, 5);

  // overlap has been set to be active when pinata is max 5 degrees from equilibrium position
 if (angle < abs(Math.PI/36)) {

    if (bat.overlap(pinata)) {
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
  if (hits >= 10) {
      pinata.remove();
      // replace here with broken pinata
      pinata.velocity.x = 0;
      pinata.velocity.y = 0;
      line(300, pivot_y, 300, 350);
    } else {
  // if (angle != 0) {
    pinataSwing()
  // }
  }
  
  if (pull !== 0 ) {
    displacement = pull;
    updateSpring()
  }
  
  hit();
  drawSprites();
}

// ************************ //

function updateSpring() {

  // Update the spring position
  if ( pull > -30 ) {
    // f = -K * ( ps + R ); // f=-ky
      f = -K * ( ps ); // f=-ky
    as = f / M;          // Set the acceleration, f=ma == a=f/m
    vs += as; // Set the velocity
    vs *= D;  // damping
    ps = ps + vs;        // Updated position
  }

  if ( abs(vs) > 5) {
    ready = false;
  } else { ready = true}
  if (abs(vs) < 0.1) {
    vs = 0.0;
  }


  // Set and constrain the position of top bar
  if (pull < -30) {
    // $('.accData').append($('<li>').text("Y acc: " + pull))
    ps = pull*0.5;
    pull *= 0.01;
    ps = constrain(ps, minHeight, maxHeight);
  }
  
}

// ******************** //

function pinataSwing(displacement) {
    console.log("Find rotate option of pinata")
    acc = -gravity*sin(angle);

    // rotating object to align with rope plus some jittering - fix jittering to re-start after every hit
    if (angle != 0) {
      pinata.rotation = -(angle*180/PI) + random(-jit, jit);
      jit *= 0.995;
    }

    pinata.velocity.y += acc;
    pinata.velocity.y *= 0.99;  // damping oscillation
    angle += pinata.velocity.y;
    pinata.position.x = pivot_x + (len - ps)*sin(angle);
    pinata.position.y = pivot_y + (len - ps)*cos(angle);
    line(pivot_x, pivot_y, pinata.position.x + random(-1, 1), pinata.position.y);
    pinata.addSpeed(pinata.velocity.y, acc);

}



