
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
var world, engine;
var groundObj, treeObj, treeImg, boyObj, boyImg;
var mango1, mango2, mango3, mango4, launcherObj, stoneObj;

function preload()
{
   treeImg = loadImage("images/tree.png");	
   boyImg = loadImage("images/boy.png");
}

function setup() {
	createCanvas(800, 700);

	engine = Engine.create();
	world = engine.world;

	treeObj = createSprite(600, 400, 20, 20);
	treeObj.addImage(treeImg);
	treeObj.scale = 0.5;

	boyObj = createSprite(200, 640, 20, 20);
	boyObj.addImage(boyImg);
	boyObj.scale = 0.1;

	groundObj = new ground(width/2, 600, width, 20);

	mango1 = new mango(600, 300, 20);
	
	launcherObj = new launcher(stoneObj.body, {x: 235, y: 420})

	render = Render.create({
	element: document.body, 
	engine: engine, 
	option:{
		width: 1300,
		height: 600,
		wireframes: false
	}
	});
	
	Engine.run(engine);
  
}

function draw() {
  background(230);
  Engine.update(engine);

  image (boy, 200, 340, 200, 300)
  
  groundObj.display();
  treeObj.display();
  mango1.display();
  stoneObj.display();

  launcherObj.display();

  detectcollision(stoneObj, mango1);
 
}

function mouseDragged(){
	Matter.Body.setPosition(stoneObj.body, {x:mouseX, y:mouseY}) 
}

function mouseReleased(){
	launcherObj.fly();
}

function keyPressed(){
	if(keyCode === 32){
		Matter.Body.setPosition(stoneObj.body, {x: 235, y: 420})
		launcherObj.attach(stoneObj.body);
	}
}

function detectcollision(lstone, lmango){
	mangoBodyPosition = lmango.body.position
	stoneBodyPosition = lstone.body.position

	var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y)

	if(distance<=lmango.r+lstone.r){
		Matter.Body.setStatic(lmango.body, false);
	}
}

