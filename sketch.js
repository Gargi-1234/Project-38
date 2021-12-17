
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;
var elephant1, elephant1Img ,elephant2Img ,elephant3Img ,bear ,bearImg
var elephant2, elephant3, elephant4, elephant5, elephantImage
var jungle2, jungle2Img
var tropicalParrot, tropicalParrotImg, macaw, macawImg, blueJay, blueJayImg, bird1, bird2, bird3
var vine1, vine1Img, vine2, vine2Img, vine3, vineI3mg, vine4, vine4Img, vine5, vine5Img

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running = loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
  jungle2Img = loadImage("assets/bg copy.png");
  elephant1Img = loadAnimation("assets/elephant1.png","assets/elephant2.png","assets/elephant3.png");
  elephant2Img = loadAnimation("assets/elephant2.png","assets/elephant3.png","assets/elephant1.png");
  elephant3Img = loadAnimation("assets/elephant3.png","assets/elephant1.png","assets/elephant2.png");
  bearImg = loadAnimation("assets/bear1.png","assets/bear2.png","assets/bear3.png","assets/bear4.png");
  elephantImage = loadAnimation("assets/elephant1.png");
  tropicalParrotImg = loadAnimation("assets/redMacaw1.png","assets/redMacaw2.png","assets/redMacaw3.png","assets/redMacaw4.png");
  macawImg = loadAnimation("assets/yellowMacaw1.png","assets/yellowMacaw2.png","assets/yellowMacaw3.png","assets/yellowMacaw4.png");
  blueJayImg = loadAnimation("assets/blueJay1.png","assets/blueJay2.png","assets/blueJay3.png","assets/blueJay4.png","assets/blueJay5.png");
  tropicalParrotImg = loadAnimation("assets/redMacaw1.png","assets/redMacaw2.png","assets/redMacaw3.png","assets/redMacaw4.png");
  macawImg = loadAnimation("assets/yellowMacaw1.png","assets/yellowMacaw2.png","assets/yellowMacaw3.png","assets/yellowMacaw4.png","assets/yellowMacaw5.png")
  vine1Img = loadImage("assets/vine.png")
  vine2Img = loadImage("assets/vine1.png")
  vine3Img = loadImage("assets/vine3.png")
  bird1 = loadAnimation("assets/yellowMacaw1.png")
  bird2 = loadAnimation("assets/redMacaw1.png")
  bird3 = loadAnimation("assets/blueJay1.png")
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  bear = createSprite(1000,220)
  bear.addAnimation("brownBear",bearImg)
  bear.velocityX = -4

  blueJay = createSprite(900,100)
  blueJay.addAnimation("blueBird",blueJayImg)
  blueJay.scale = 0.8

  tropicalParrot = createSprite(-500,100)
  tropicalParrot.addAnimation("redMacaw",tropicalParrotImg)
  tropicalParrot.scale = 0.8
  tropicalParrot.velocityX = 3

  macaw = createSprite(1000,100)
  macaw.addAnimation("yellowMacaw",macawImg)
  macaw.scale = 0.5
  macaw.velocityX = -7
  
  elephant1 = createSprite(100,200)
  elephant1.addAnimation("trumpet",elephant1Img)
  elephant1.scale = 2.5
  elephant1.velocityX = -3.5

  elephant2 = createSprite(650,200)
  elephant2.addAnimation("huge",elephant2Img)
  elephant2.scale = 2.5
  elephant2.velocityX = -3.5

  elephant3 = createSprite(405,225)
  elephant3.addAnimation("greyElephant",elephant3Img)
  elephant3.scale = 2
  elephant3.velocityX = -3.5

  elephant4 = createSprite(250,250)
  elephant4.addAnimation("trumpet",elephant1Img)
  elephant4.scale = 1.5
  elephant4.velocityX = -3.5

  elephant5 = createSprite(550,250)
  elephant5.addAnimation("huge",elephant2Img)
  elephant5.scale = 1.5
  elephant5.velocityX = -3.5
  
  jungle2 = createSprite(400,100,400,20);
  jungle2.addImage("forest",jungle2Img);
  jungle2.scale=0.3
  jungle2.x = width /2;

  kangaroo = createSprite(50,200,20,50);
  kangaroo.addAnimation("running", kangaroo_running);
  kangaroo.addAnimation("collided", kangaroo_collided);
  kangaroo.scale = 0.15;
  kangaroo.setCollider("circle",0,0,300)

  vine1 = createSprite(100,60)
  vine1.addAnimation("leaves",vine1Img)
  vine1.scale = 1
  vine1.velocityX = -3

  vine2 = createSprite(300,60)
  vine2.addAnimation("purple",vine2Img)
  vine2.scale = 1
  vine2.velocityX = -3

  vine3 = createSprite(500,60)
  vine3.addAnimation("yellow",vine3Img)
  vine3.scale = 1
  vine3.velocityX = -3

  vine4 = createSprite(700,60)
  vine4.addAnimation("leaf",vine1Img)
  vine4.scale = 1
  vine4.velocityX = -3

  invisibleGround = createSprite(400,350,1600,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(width/2,height/2)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);

  // kangaroo.x=camera.positionX-270;
  // kangaroo.x=Camera.position.x-270;
     kangaroo.x=camera.position.x-270;
  // kangaroo.x=Camera.Position.X-270;

  if (gameState===PLAY){

    jungle.velocityX=-4
    jungle2.velocityX=-4

    if(vine1.x < -800){
      vine1.x = 1000
      vine2.x = 1200
      vine3.x = 1400
      vine4.x = 1600
    }

    if(elephant4.x < 50){
      bear.scale = bear.scale - 0.005
      bear.y = bear.y + 0.5
      }
    
    if(tropicalParrot.x > 800){
      blueJay.velocityX = -6
    }

    if(jungle.x<100){
      jungle.x=400
      jungle2.x=400
    }

   console.log(kangaroo.y)

    if(keyDown("space")&& kangaroo.y>270) {
      jumpSound.play();
      kangaroo.velocityY = -16;
    }
  
    kangaroo.velocityY = kangaroo.velocityY + 0.8
    spawnShrubs();
    spawnObstacles();

    kangaroo.collide(invisibleGround);
    
    if(obstaclesGroup.isTouching(kangaroo)){
      collidedSound.play();
      gameState = END;
    }
    if(shrubsGroup.isTouching(kangaroo)){

      shrubsGroup.destroyEach();
    }
  }
  else if (gameState === END) {
    gameOver.visible = true
    kangaroo.velocityY = 0;
    jungle.velocityX = 0;
    jungle2.velocityX = 0;
    macaw.velocityX = 0
    tropicalParrot.velocityX = 0
    blueJay.velocityX = 0
    elephant1.velocityX = 0
    elephant2.velocityX = 0
    elephant3.velocityX = 0
    elephant4.velocityX = 0
    elephant5.velocityX = 0
    vine1.velocityX = 0
    vine2.velocityX = 0
    vine3.velocityX = 0
    vine4.velocityX = 0
    blueJay.addAnimation("wildBird",bird3)
    blueJay.changeAnimation("wildBird",bird3)
    tropicalParrot.addAnimation("tropicalbird",bird2)
    tropicalParrot.changeAnimation("tropicalbird",bird2)
    elephant1.addAnimation("wildElephant",elephantImage)
    elephant1.changeAnimation("wildElephant",elephantImage)
    elephant2.addAnimation("wildElephant",elephantImage)
    elephant2.changeAnimation("wildElephant",elephantImage)
    elephant3.addAnimation("wildElephant",elephantImage)
    elephant3.changeAnimation("wildElephant",elephantImage)
    elephant4.addAnimation("wildElephant",elephantImage)
    elephant4.changeAnimation("wildElephant",elephantImage)
    elephant5.addAnimation("wildElephant",elephantImage)
    elephant5.changeAnimation("wildElephant",elephantImage)
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);

    kangaroo.changeAnimation("collided",kangaroo_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
    
  }

  
  drawSprites();


}

function spawnShrubs() {

  if (frameCount % 150 === 0) {

    // var shrub = createSprite(camera.position+500,330,40,10);
       var shrub = createSprite(camera.position.x+500,330,40,10);
    // var shrub = createSprite(camera.positionX+500,330,40,10);
    // var shrub = createSprite(Camera.position.x+500,330,40,10);

    shrub.velocityX = -(6 + 3*score/100)
    shrub.scale = 0.6;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: shrub.addImage(shrub1);
              break;
      case 2: shrub.addImage(shrub2);
              break;
      case 3: shrub.addImage(shrub3);
              break;
      default: break;
    }
         
    shrub.scale = 0.05;
    shrub.lifetime = 400;
    
    shrub.setCollider("rectangle",0,0,shrub.width/2,shrub.height/2)
    shrubsGroup.add(shrub);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {

    // var obstacle = createSprite(camera.Position.X+400,330,40,40);
    // var obstacle = createSprite(Camera.Position.x+400,330,40,40);
       var obstacle = createSprite(camera.position.x+400,330,40,40);
    // var obstacle = createSprite(camera.position.x.400,330,40,40);

    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.addImage(obstacle1);
    obstacle.velocityX = -(6 + 3*score/100)
    obstacle.scale = 0.15;   
 
    obstacle.lifetime = 400;
    obstaclesGroup.add(obstacle);
    
  }
}