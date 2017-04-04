var img;
var star;
var pinata;
function preload() {  // preload() runs once
  img = loadImage("assets/image/small_rectangle.png");
  pinataImg = loadImage("assets/image/flappy_pipe.png");
}

function setup() {
  var myCanvas = createCanvas(800, 1000);
  myCanvas.parent('canvas'); 
  image(img, 0, 0);
  image(pinataImg, 0, 0);

  star = createSprite(200, 200);
  star.addImage(img)

  pinata = createSprite(width/2, 10);  
  pinata.addImage(pinataImg);

}
var posX = 350
var posY = 200;

function draw() {
  background(200,200,200,200);  
  
  if(accelerationX > 0) {
    posX += accelerationX*4;
    $('.accData').append($('<li>').text("X acc: " + accelerationX))
  }
  if(accelerationY > 0) {
    posY += accelerationY*4;
    $('.accData').append($('<li>').text("Y acc: " + accelerationY))
  }
  if(accelerationX < 0) {
    posX += accelerationX*4;
    $('.accData').append($('<li>').text("X acc: " + accelerationX))
  }
  if(accelerationY < 0) {
    posY += accelerationY*4;
    $('.accData').append($('<li>').text("Y acc: " + accelerationY))
  }

  star.position.x = posX;
  star.position.y = posY;

  star.bounce(pinata);

  if(star.position.x < 0) { star.position.x = 2; }
  if(star.position.x > width) {star.position.x = width - 2;}
  if (star.position.y < 0 ) { star.position.y = 1;}
  if (star.position.y > height) { star.position.y = height -1;}
  drawSprites();
}

