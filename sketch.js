var mar , barco, moeda, diamante, tesouro, espada, barco2, gameOver;
var marImg,barcoImg,moedaImg,diamanteImg,tesouroImg,espadasImg, barco2Img, gameOverImg;
var treasureCollection = 0;
var moedaG,diamanteG,tesouroG,espadaGroup;

//Estados do jogo
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  marImg = loadImage("mar.png");
  barcoImg = loadImage("barco.png");
  moedaImg = loadImage("moeda.png");
  diamanteImg = loadImage("diamante.png");
  tesouroImg = loadImage("tesouro.png");
  espadaImg = loadImage("espada.png");
  endImg =loadAnimation("gameOver.png");
  barco2Img =loadImage("barcoquebrado.png");
  gameOverImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);

// Movendo plano de fundo
mar=createSprite(200,200);
mar.addImage(marImg);
mar.velocityY = 4;
mar.scale= 0.5;


//criar menino correndo 
barco = createSprite(90,520,20,20);
barco.addAnimation("SahilRunning",barcoImg);
barco.scale= 1;
  
barco2 = createSprite(200,500,1,1);
barco2.scale= 1; 

gameOver = createSprite(200,300,1,1);
gameOver.scale= 0.5; 
  
moedaG=new Group();
diamanteG=new Group();
tesouroG=new Group();
espadaGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  barco.x = World.mouseX;
  
  edges= createEdgeSprites();
  barco.collide(edges);
  
  //código para redefinir plano de fundo
  if(mar.y > 500 ){
    mar.y = 200;
  }
  
    createMoeda();
    createDiamante();
    createTesouro();
    createEspada();

    if (moedaG.isTouching(barco)) {
        moedaG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamanteG.isTouching(barco)) {
        diamanteG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(tesouroG.isTouching(barco)) {
        tesouroG.destroyEach();
      treasureCollection=treasureCollection + 150;
      
    }
    else if(espadaGroup.isTouching(barco)) {
     gameState =END;
    } 

    if (gameState === END) {
        barco.addAnimation("SahilRunning",endImg);
        barco.x=200;
        barco.y=300;
        barco.scale=0.6;
        
        moedaG.destroyEach();
        diamanteG.destroyEach();
        tesouroG.destroyEach();
        espadaGroup.destroyEach();
        barco.destroy()
        
        moedaG.setVelocityYEach(0);
        diamanteG.setVelocityYEach(0);
        tesouroG.setVelocityYEach(0);
        espadaGroup.setVelocityYEach(0);

        mar.velocityY = 0;
        barco2.addImage(barco2Img);
        gameOver.addImage(gameOverImg);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesouro: "+ treasureCollection,150,30);
  }


function createMoeda() {
  if (World.frameCount % 200 == 0) {
  var moeda = createSprite(Math.round(random(50, 350),40, 10, 10));
  moeda.addImage(moedaImg);
  moeda.scale= 0.09;
  moeda.velocityY = 3;
  moeda.lifetime = 150;
  moedaG.add(moeda);
  }
}

function createDiamante() {
  if (World.frameCount % 320 == 0) {
  var diamante = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamante.addImage(diamanteImg);
  diamante.scale= 0.1;
  diamante.velocityY = 3;
  diamante.lifetime = 150;
  diamanteG.add(diamante);
}
}

function createTesouro() {
  if (World.frameCount % 410 == 0) {
  var tesouro = createSprite(Math.round(random(50, 350),40, 10, 10));
  tesouro.addImage(tesouroImg);
  tesouro.scale=0.09;
  tesouro.velocityY = 3;
  tesouro.lifetime = 150;
  tesouroG.add(tesouro);
  }
}

function createEspada(){
  if (World.frameCount % 530 == 0) {
  var espada = createSprite(Math.round(random(50, 350),40, 10, 10));
  espada.addImage(espadaImg);
  espada.scale=0.1;
  espada.velocityY = 3;
  espada.lifetime = 150;
  espadaGroup.add(espada);
  }
}