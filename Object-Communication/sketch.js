let bubbles = [];
let myBots = [];


function setup() {
  createCanvas(windowWidth,windowHeight);
  for(let i = 0; i<100;i++){
    let x =random(width);
    let y=random(height);
    let r = random(5,10);
    bubbles[i] = new Bubble(x,y,r);
  }
  for (var i = 0; i < 50; i++) {
    myBots.push(new Bot(random(0, width), random(0, height)));
  }
}

function draw() {
  background(0); 
  for (var i = 0; i < myBots.length; i++) {
    myBots[i].update();
    if (myBots[i].alive == 0) {
      myBots.splice(i, 1); // alten bot löschen
      myBots.push(new Bot(random(0, width), random(0, height))); // neuen bot erzeugen!!
    }
    myBots[i].draw();

  } 
  for(b of bubbles){
    b.show();
    b.move();
    let overlapping =false;
    for (other of bubbles){
      if(b!==other&&b.intersects(other)){
        overlapping = true;
      }
    }
    if (overlapping){
      b.setColor(color(255,255,0));
    }else
      b.setColor(color(255,0,200)) ;

  }


}

class Bubble{
  constructor(x,y,r=50){
    this.x=x;
    this.y=y;
    this.r=r;
    this.brightness= 0;
  }
  setColor(bright){
    this.brightness=bright;
  }
  intersects(other){
    let d = dist(this.x,this.y,other.x,other.y);
    if(d<this.r +other.r){
      return true;
    }else
      return false;
  }
  move(){
    this.x = this.x +random(-2,2);
    this.y = this.y +random(-2,2);
  }

  show(){
    stroke(color(255,0,0));
    strokeWeight(4);
    fill(this.brightness,200);
    ellipse(this.x, this.y,this.r *2);
  }
}

class Bot{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.targetpos = createVector(random(x),random(y));
    this.sped = random(0.1,5);
    this.color= color(245, 166, 10);
    this.size =5;
  }

  update(){
    this.pos.x = (this.pos.x*0.99) + (this.targetpos.x*0.01);
    this.pos.y = (this.pos.y*0.99) + (this.targetpos.y*0.01);
    if (p5.Vector.dist(this.pos, this.targetpos) < 10) {
      this.targetpos = createVector(random(width), random(height));
    }
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }
  draw() {
    // aussehen / zeichen
    noStroke(); //(255);
    fill(this.color, 128);
    // noFill();
    ellipse(this.pos.x, this.pos.y, this.size, this.size)
    stroke(255,128);
    strokeWeight(1);
    for (var i = 0; i<myBots.length;i=i+2) {
      if (this != myBots[i]){ // nicht ich
        if (dist(this.pos.x,this.pos.y, myBots[i].pos.x,myBots[i].pos.y)<60) {
          line(this.pos.x,this.pos.y, myBots[i].pos.x,myBots[i].pos.y);
        }
      } 

    }
  }
}