var dog, happyDog, database, foods, foodStock,dogImg,happyDogImg;

function preload()
{
dogImg = loadImage("Dog.png");
happyDogImg = loadImage("happydog.png");
}

function setup() {
  createCanvas(600,600);
  dog = createSprite(250,250,20,20);
  dog.scale = 0.2;

  database=firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  setStock(20)
  
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  textSize(25);
  fill("black")
  stroke ("black")
  text("NOTE: Press up arrow key to feed OREO the milk!", 10,50); 
  
  dog.addImage(dogImg);

  if(keyDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(happyDogImg);
  }
  text ("FOOD LEFT:" + foods,250,400 )


}
  //add styles here
  function readStock(data){
    foods=data.val();
    //console.log("foods in read stock"+foods);
}

function writeStock(x){
//console.log("x in write stock"+x)

      if(x<=0){
        x=0;
      }else{
        x=x-1
      }
      
        setStock(x)

}

function setStock(x){
database.ref('/food').set(x)
}
