var img;
var star;
var pinata;
var len = 10;
// bat angle
var batAngle;
var bat;
var batX;
var batY;
var armX;
var armY;
batAngle = -90;
//-------------Spring--------------
// Spring drawing constants for top bar
var ready = true;
var springHeight = 32,
  left,
  right,
  maxHeight = 800,
  minHeight = 100,
  over = false,
  move = false;

// Spring simulation constants
var M = 8, // Mass
  K = 0.2, // Spring constant
  D = 0.92, // Damping
  R = 400; // Rest position

// Spring simulation variables
var ps = R, // Position
  vs = 0.0, // Velocity
  as = 0, // Acceleration
  f = 0; // Force

//----preload images----
function preload() {
  arm = loadImage('assets/image/arm125.png')
}


function setup() {
  //canvas width spans width of browser window, height fixed
  var myCanvas = createCanvas(900, 700);
  //canvas set inside div id='canvas'
  myCanvas.parent('canvas');

  // ----------setup spring----------
  rectMode(CORNERS);
  noStroke();
  left = width / 2 - 100;
  right = width / 2 + 100;
  // -------------bat-----------------
  batX = width / 2;
  batY = height / 3;
  // var armY = batY;
  // var armX = batX;
  bat = createSprite(batX, batY, batX + 20, batY + 100);
  bat.shapeColor = color(128);
  bat.addImage(arm)

  // bat.draw = function () {
  //   push();
  //   rectMode(CENTER);
  //   rect(batX, batY, 20, 200);
  //   pop();

  //   // image(arm)

  // }
}


function draw() {
  background(200, 200, 200, 200);

  // ---spring---
  updateSpring();
  drawSpring();
  //bat swing
  batSwing();
  drawSprites();
}

function batSwing() {
  armY = batY + 100
  armX = batX;
  batAngle = constrain(batAngle, 45, -90);
  if (mouseIsPressed) {
    batAngle -= 0.1;
    bat.rotation = batAngle;
    //location of Y depending on the angle
    // bat.position.y = armY += abs(armX * tan(degrees(batAngle)));
    console.log("----------------")
    console.log(armY)
    // bat.position.x = constrain(bat.position.x, batX - 100, batX + 100);
    // bat.position.y = constrain(bat.position.y, batY - 100, batY + 100);
  }
  // if (accelerationX < 0) {
  //   batAngle += accelerationX;
  // }
  // //constrain bat angle for restring swing rotation

}

function drawSpring() {
  // Draw rectangle rope
  fill(0.2);
  var baseWidth = displayWidth * 0.005;
  rect(width / 2 - baseWidth, 0, width / 2 + baseWidth, ps + springHeight);

  // Set color and draw pinata(square now)
  fill('red');
  rect(left, ps + springHeight, right, ps + springHeight + 120);
}

function updateSpring() {
  // Update the spring position
  if (accelerationY > -30) {
    f = -K * (ps - R); // f=-ky
    as = f / M; // Set the acceleration, f=ma == a=f/m
    vs = D * (vs + as); // Set the velocity
    ps = ps + vs; // Updated position
  }

  if (abs(vs) > 5) {
    ready = false;
  } else {
    ready = true
  }
  if (abs(vs) < 0.1) {
    vs = 0.0;
  }


  // Set and constrain the position of top bar
  if (accelerationY < -30 && ready) {
    $('.accData').append($('<li>').text("Y acc: " + accelerationY))
    ps = accelerationY * 0.5;
    ps = constrain(ps, minHeight, maxHeight);
  }
}