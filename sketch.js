var girl, girl_running, girl_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var distance;

function preload(){
  girl_running = loadAnimation("1.png","3.png","4.png");
  girl_collided = loadAnimation("3.png");
  
  groundImage = loadImage("ground2.png");
  groundImage2 = loadImage("gro.png");

  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  lose_img=loadImage("lose.png");
}
function setup() {
  createCanvas(1000, 500);
 
  ground = createSprite(200,435,400,20);
  ground.addImage("ground",groundImage);
  ground.scale=12;

  ground.debug=false;
  ground.setCollider("rectangle",0,0,this.width,2);
  cloudsGroup = createGroup();
  obstaclesGroup = createGroup();

  girl = createSprite(0,430,20,50);
  box = createSprite(4000,160,20,50);
  girl.addAnimation("collided",girl_collided);
  girl.addAnimation("running", girl_running);
  girl.scale = 0.6;

  girl.setCollider("rectangle",0,0,100,230);
  girl.debug = false;
  
  distance = 0;


}
function draw() {
  spawnClouds();
  background("lightblue");
 
  textSize(20);
  fill("red")
  stroke("yellow");
  strokeWeight(1);
  text("Distance: "+ distance, ground.x+200,50); 
    if(keyDown("space")&& girl.y >= 180) {
        girl.velocityY = -15;
       
        girl.x+=5;
     
       
    }
    if(girl.y<=430){
        girl.changeAnimation("running", girl_running);
    }
    if(girl.y>=430){
        girl.changeAnimation("collided", girl_collided);
    }
    if(girl.y>=180){
      ground.x+=1;
    }
   girl.velocityY = girl.velocityY + 0.8
  
   
   distance = distance + Math.round(frameCount/60);
  
    spawnObstacles();
   
  
    if(obstaclesGroup.isTouching(girl)){
        var lose=createSprite(500,250,50,50);
        lose.addImage(lose_img);
        lose.scale=0.85; 
        lose.x=ground.x;
      girl.velocityX=0;
      girl.velocityY=0;
      girl.y=160;
      camera.position.x=girl.position.x;
      girl.changeAnimation("collided", girl_collided);
      obstaclesGroup.setVelocityXEach(100);
      cloudsGroup.setVelocityXEach(100);
      textSize(30);
      fill("blue")
      stroke("yellow");
      strokeWeight(2);
      text("You Lose ", girl.x+160,150); 
     
    }     
     girl.collide(ground); 
     if(girl !== undefined){   
    camera.position.x = ground.x
  }


  drawSprites();
 
}
function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(600,430,10,40);
   obstacle.velocityX = -5;
   obstacle.debug=false;
   obstacle.setCollider("rectangle",0,0,50,50);
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
    obstacle.scale = 2;
    ;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
 }

}
function spawnClouds() {
  if (frameCount % 150 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale =0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.depth = girl.depth;
    girl.depth = girl.depth + 1;
    cloudsGroup.add(cloud);
  }
}

