var img;
var star;
var pinata;
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
var M = 8,  // Mass
    K = 0.2,  // Spring constant
    D = 0.92, // Damping
    R = 600;  // Rest position

// Spring simulation variables
var ps = R,   // Position
    vs = 0.0, // Velocity
    as = 0,   // Acceleration
    f = 0;    // Force

//-------------end Spring--------------
// function preload() {  // preload() runs once
//   img = loadImage("assets/image/small_rectangle.png");
//   pinataImg = loadImage("assets/image/flappy_pipe.png");
// }

function setup() {
  var myCanvas = createCanvas(800, 1000);
  myCanvas.parent('canvas'); 
  // image(img, 0, 0);
  // image(pinataImg, 0, 0);

  // star = createSprite(200, 200);
  // star.addImage(img)

  // pinata = createSprite(width/2, 10);  
  // pinata.addImage(pinataImg);
  // ----------setup spring----------
  rectMode(CORNERS);
  noStroke();
  left = width/2 - 100;
  right = width/2 + 100;
}
// var posX = 350
// var posY = 200;

function draw() {
  background(200,200,200,200);  
  
  // ---spring---
  updateSpring();
  drawSpring();

  // if(accelerationX > 0) {
  //   posX += accelerationX*1.5;
  //   $('.accData').append($('<li>').text("X acc: " + accelerationX))
  // }
  // if(accelerationY > 0) {
  //   posY += accelerationY*1.5;
  //   $('.accData').append($('<li>').text("Y acc: " + accelerationY))
  // }
  // if(accelerationX < 0) {
  //   posX += accelerationX*1.5;
  //   $('.accData').append($('<li>').text("X acc: " + accelerationX))
  // }
  // if(accelerationY < 0) {
  //   posY += accelerationY*1.5;
  //   $('.accData').append($('<li>').text("Y acc: " + accelerationY))
  // }

  // star.position.x = posX;
  // star.position.y = posY;

  // // star.bounce(pinata);

  // if(star.position.x < 0) { star.position.x = 2; }
  // if(star.position.x > width) {star.position.x = width - 2;}
  // if (star.position.y < 0 ) { star.position.y = 1;}
  // if (star.position.y > height) { star.position.y = height -1;}
  drawSprites();
}

function drawSpring() {
  // Draw base
  fill(0.2);
  var baseWidth = 20;
  rect(width/2 - baseWidth, 0, width/2 + baseWidth, ps + springHeight);

  // Set color and draw top bar
    fill(600);

  rect(left, ps + springHeight , right, ps + springHeight + 20);
}

function updateSpring() {
  // Update the spring position
  if ( accelerationY > -30 ) {
    f = -K * ( ps - R ); // f=-ky
    as = f / M;          // Set the acceleration, f=ma == a=f/m
    vs = D * (vs + as);  // Set the velocity
    ps = ps + vs;        // Updated position
  }

  if ( abs(vs) > 5) {
    ready = false;
  } else { ready = true}
  if (abs(vs) < 0.1) {
    vs = 0.0;
  }


  // Set and constrain the position of top bar
  if (accelerationY < -30 && ready) {
    $('.accData').append($('<li>').text("Y acc: " + accelerationY))
    ps = accelerationY*0.5;
    ps = constrain(ps, minHeight, maxHeight);
  }
}
