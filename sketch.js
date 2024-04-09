var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2, obstacleTopGroup
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3, obstacleBottomGroup
var PLAY = 1
var END = 0
var gameState = PLAY
var gameOver, gameOverImg, restart, restartImg
var score = 0

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

gameOverImg = loadImage("assets/gameOver.png")
restartImg = loadImage("assets/restart.png")

}

function setup(){

  createCanvas(400,400)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

gameOver = createSprite(220, 200)
gameOver.addImage(gameOverImg)
gameOver.scale = 0.5
gameOver.visible = false

restart = createSprite(220, 240)
restart.addImage(restartImg)
restart.scale = 0.5
restart.visible = false

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

obstacleBottomGroup = new Group()
obstacleTopGroup = new Group()
barGroup = new Group()

}

function draw() {
  
  background("black");
        if(gameState === PLAY){

          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;

           
          Bar();
   
        
       
        //spawning top obstacles
      spawnObstaclesTop();
      spawnObstaclesBottom()

          if(obstacleTopGroup.isTouching(balloon) || obstacleBottomGroup.isTouching(balloon)){
            gameState = END
          }

        }

        if(gameState === END){
          gameOver.visible = true
          restart.visible = true
          gameOver.depth = gameOver.depth + 1
          restart.depth = restart.depth + 1
          balloon.velocityY = 0
          balloon.velocityX = 0
          obstacleTopGroup.setVelocityXEach(0)
          obstacleBottomGroup.setVelocityXEach(0)
          barGroup.setVelocityXEach(0)
          obstacleTopGroup.setLifetimeEach(-1)
          obstacleBottomGroup.setLifetimeEach(-1)
          balloon.y = 200
          if(mousePressedOver(restart)){
            reset()
          }
        }
        drawSprites();
        displayScore()
}


function spawnObstaclesTop() 
{
      if(World.frameCount % 60 === 0) {
        obstacleTop = createSprite(400,50,40,50);
    
    //obstacleTop.addImage(obsTop1);
    
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;

    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10,100));

    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacleTop.addImage(obsTop1);
              break;
      case 2: obstacleTop.addImage(obsTop2);
              break;
      default: break;
    }

     //assign lifetime to the variable
   obstacleTop.lifetime = 100;
    
   balloon.depth = balloon.depth + 1;
   obstacleTopGroup.add(obstacleTop)
   
      }

    
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
          barGroup.add(bar)
         }
}

function spawnObstaclesBottom()
{
  if(World.frameCount % 60 === 0) {
  obstacleBottom = createSprite(400,325,40,50);
  
  obstacleBottom.scale = 0.1
  obstacleBottom.velocityX = -4

  obstacleBottom.lifetime = 100

  var rand = Math.round(random(1,3))
  switch(rand){
    case 1:obstacleBottom.addImage(obsBottom1)
           break
    case 2:obstacleBottom.addImage(obsBottom2)
           break
    case 3:obstacleBottom.addImage(obsBottom3)
    default: break



  }

  obstacleBottom.visible = true

  balloon.depth = balloon.depth + 1
  obstacleBottomGroup.add(obstacleBottom)
  }
  
  
}

function reset(){
  gameState = PLAY
  gameOver.visible = false
  restart.visible = false
  obstacleTopGroup.destroyEach()
  obstacleBottomGroup.destroyEach()
  score = 0
  
}

function displayScore(){
  if(balloon.isTouching(barGroup)){
    score = score + 1
  }
  textSize(25)
  fill("purple")
  text("Score: " + score, 275, 45)
}