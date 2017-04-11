// pendulum
var pivot_x = 250;
var pivot_y = 20;
var len = 250;
var angle = 0;
// var angle = Math.PI/4;
var gravity = 0.01;
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
var M = 8, // Mass
    K = 0.2, // Spring constant
    D = 0.98; // Damping
// R = 0;

// Spring simulation variables
var ps = 0, // Position   ps = R,
    vs = 0.0, // Velocity
    as = 0, // Acceleration
    f = 0; // Force

// candy spill
var candies = [];

// *************** //

// preload image to sprite
function preload() {
    arm = loadImage('arm125.png');
    dummy = loadImage('bird.png');
}

// *************** //

function setup() {
    var myCanvas = createCanvas(600, 600);
    myCanvas.parent('canvas');

    // cord
    line(pivot_x, pivot_y, 300, 250);

    // pinata
    pinata = createSprite(pivot_x, pivot_y, 50, 50);
    pinata.addImage(dummy);
    // pinata.draw = function() {
    //     fill(125, 125),
    //     stroke(0, 125, 235),
    //     strokeWeight(2),
    //     ellipse(0, 0, 40, 90)
    // }
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
    
    // candies
    for (var i=0; i<150; i++) {
      candies.push(new Candy());
    }
}

// bat hit function triggered by mouse press
function hit() {

    // change here to bat trigger
    if (mouseIsPressed) {
        // random cord length
        // len += random(-10, 40)

        // bat forward x and some up/down y position change
        // translate trigger value to bat position
        bat.position.x += random(0, -50);
        bat.position.y += random(-10, 20);

        // bat forward rotation
        bat.rotation = -20;
    } else {
        // return bat to original position
        bat.rotation = 10;
        bat.position.x = 500;
        bat.position.y = 400
        len = 250;
    }

    // collision detection
    if (bat.overlap(pinata)) {

        // translate phone-speed to angle - some equation here
        angle = -Math.PI / 15 * 1;
        // console.log("show stats of swing or damage caused to pinata")

        // update hits
        hits++;
        console.log("number of hits: " + hits);
    } else {
        pinata.shapeColor = color(0);
    }
}

// *************************** //

function draw() {
    background(50);
    // reference pivot point - not needed
    ellipse(250, 20, 5, 5);
    // reference equilibrium point - not needed
    ellipse(250, len + 20, 5, 5);


    // what happens after screwing up pinata
    if (hits >= 7) {
        pinata.remove();
        // replace here with broken pinata
        pinata.velocity.x = 0;
        pinata.velocity.y = 0;
        line(pivot_x, pivot_y, pivot_x, pivot_y + len);
        for (var i=0; i < candies.length; i++) {
    
        //   if (candies[i].pos.x > 0) {
          candies[i].applyForce();
          candies[i].update();
          candies[i].show();
          
          // bounce off screen-bottom
          // if (candies[i].pos.y > height - 20) {
          //   candies[i].pos.y = height - 20;
          //   candies[i].vel.x *= 0.9;
          //   candies[i].vel.y *= -0.6;
          // }
        //   }
        
  }
    } else {
        pinataSwing()
    }
    

    // cord pull trigger
    if (accelerationY !== 0) {
        // what accelerationY will trigger spring motion,
        // negative value to pinata upward motion

        updateSpring()
    }

    hit();
    drawSprites();
}

// ************************ //

function updateSpring() {

    // Update the spring position
    if (accelerationY > -30) {
        f = -K * (ps); // f=-ky
        as = f / M; // Set the acceleration, f=ma == a=f/m
        vs += as; // Set the velocity
        vs *= D; // damping
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
    if (accelerationY < -30) {
        // $('.accData').append($('<li>').text("Y acc: " + accelerationY))
        ps = accelerationY * 0.5;
        accelerationY *= 0.01;  // damping
        ps = constrain(ps, minHeight, maxHeight);
    }

}

// ******************** //

function pinataSwing(displacement) {
    acc = -gravity * sin(angle);

    // rotating object to align with rope plus some jittering - fix jittering to re-start after every hit, not really needed
    if (angle != 0) {
        pinata.rotation = -(angle * 180 / PI) + random(-jit, jit);
        jit *= 0.995;
    }

    pinata.velocity.y += acc;
    pinata.velocity.y *= 0.99; // damping oscillation
    angle += pinata.velocity.y;
    pinata.position.x = pivot_x + (len - ps) * sin(angle);
    pinata.position.y = pivot_y + (len - ps) * cos(angle);
    line(pivot_x, pivot_y, pinata.position.x + random(-1, 1), pinata.position.y);
    pinata.addSpeed(pinata.velocity.y, acc);

}

// ******************** //

function Candy(batForce, img) {
  
  this.pos = createVector(pivot_x - 10, pivot_y + len + 40);
  // this.img = sweet;
  
  this.vel = createVector(random(-1, 0.2), random(-2,0));
  
  this.vel.mult(random(0, 3))
  this.acc = createVector(0, 0);
  var grav = createVector(0, 0.1);
  
 
  this.applyForce = function() {
  // mass = 1
    this.acc.add(grav);
  }
  
  this.update = function(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  this.show = function() {
    fill(125, 125, 255);
    noStroke;
    // stroke(0, 125, 235);
    // strokeWeight(1);
    imageMode(CENTER);
    // image(this.img, this.pos.x, this.pos.y )
    ellipse(this.pos.x, this.pos.y, random(7, 11), random(5, 9));
  }
}