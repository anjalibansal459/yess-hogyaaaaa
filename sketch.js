var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,playerImg;
var road, bgImg;
var obstacles,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstaclesGroup;
var enemyCar,enemyCarImg,enemyCarGroup;
var bullet,bulletImg,bulletGroup;
var gameOver,restart;

var score = 0;

function preload(){
  playerImg = loadImage("player.png");
  bgImg = loadImage("background.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  enemyCarImg = loadImage("enemyCar.png");
  bulletImg = loadImage("bullet.png")
  gameOverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
}
function setup(){
    createCanvas(displayWidth-5,displayHeight-120);

    road=createSprite(displayWidth/2,200);
    road.addImage(bgImg);
    road.velocityY = 8;

    player = createSprite(width/2,height-110,50,50);
    player.addAnimation("running",playerImg);
    player.scale=0.2;
    //player.debug = true;
    player.setCollider("circle",0,0,50);

    gameOver = createSprite(displayWidth/2,displayHeight/2-300);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(displayWidth/2,displayHeight/2-100);
    restart.addImage(restartImg);
    
    gameOver.scale = 1;
    restart.scale = 0.5;
  

    obstaclesGroup = new Group();
  
   enemyCarGroup = new Group();
   bulletGroup = new Group();
}

function draw(){
  background(0);

  if(gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
   player.x = mouseX;

   road.velocityY = 8;

   if(road.y > height ){
    road.y = height/10;
  }

  if(bulletGroup.isTouching(enemyCarGroup)){
        bullet.destroy();
        enemyCar.destroy();
         score = score+1;
}
  spawnObstacles();
 spawnenemyCar();

 if(obstaclesGroup.isTouching(player)){
  gameState = END;
 }
}
else if(gameState === END){
  enemyCarGroup.destroyEach();
  obstaclesGroup.destroyEach();
  //player.destroy();

  road.velocityY = 0;

   gameOver.visible = true;
  restart.visible = true;

  if(mousePressedOver(restart)) {
    reset();
  }
}
 
    drawSprites();
    textSize(20);
    fill(255);
    text("Score: "+ score, 500,50);
}

function keyPressed(){
if(keyCode === UP_ARROW){
bullet = createSprite(width/2,height-110,50,50);
bullet.addImage(bulletImg);
bullet.scale=0.2;
bullet.x =player.x;
bullet.velocityY = -8;
bullet.lifetime = 300;
bullet.depth = enemyCarGroup.depth;
enemyCarGroup.depth = enemyCarGroup.depth +1;
bulletGroup.add(bullet);
}
}


function spawnObstacles(){
  if(frameCount % 75 === 0){
    var obstacle = createSprite(Math.round(random(50, width-20),40, 10, 10));
    obstacle.velocityY = 10;

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;        
      default: break;
    }

    obstacle.scale = 1.5;
    obstacle.lifetime = 300;
    obstacle.depth = player.depth;
    player.depth = player.depth +1;
    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,50);
    obstaclesGroup.add(obstacle);
  }
}

function spawnenemyCar(){
        if(frameCount % 100 === 0){
         enemyCar = createSprite(Math.round(random(50, width-50),40, 10, 10));
        enemyCar.addImage(enemyCarImg);
          enemyCar.velocityY = 10;
          enemyCar.scale = 1;
        enemyCar.lifetime = 300;
        enemyCar.depth = player.depth;
        player.depth = player.depth + 1;
        enemyCarGroup.add(enemyCar);
        }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;


  score = 0;
  
}