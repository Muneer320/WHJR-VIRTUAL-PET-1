var dog, dogImg2, database, foodS, foodStock, position;
var backgroundImg, dogImg;

function preload() {
  dogImg = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(900, 500);
  database = firebase.database();

  dog = createSprite(450, 300, 50, 50);
  dog.addImage(dogImg2);
  dog.scale = 0.5;
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock)
}

function draw() {
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS)
    dog.addImage(dogImg);
  }

  drawSprites();
  textSize(25);
  fill("black");
  text("Food remaining:" + foodS, 100, 50);
  text("Use Up Arrow key to feed the dog!", 100, 90)

}

function writeStock(petFOOD) {
  if (petFOOD <= 0) {
    petFOOD = 0
  }
  else {
    petFOOD = petFOOD - 1;
  }
  database.ref('/').update({
    Food: petFOOD
  })
}
function readStock(data) {
  foodS = data.val();

}