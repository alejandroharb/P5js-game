var img;
var star;
var pinata;
function preload() {  // preload() runs once
  img = loadImage("assets/image/small_rectangle.png");
  pinataImg = loadImage("assets/image/flappy_pipe.png");
}

function setup() {
  var myCanvas = createCanvas(600, 400);
  myCanvas.parent('canvas'); 
  image(img, 0, 0);
  image(pinataImg, 0, 0);

  star = createSprite(200, 200);
  star.addImage(img)

  pinata = createSprite(width/2, 10);  
  pinata.addImage(pinataImg);

}

function draw() {
  background(200,200,200,200);  
  
  star.position.x = mouseX;
  star.position.y = mouseY;

  star.displace(pinata);

  drawSprites();
}

