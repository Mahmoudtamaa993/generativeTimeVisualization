
let angle = 0;
let lr = 150;

let myBots = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 50; i++) {
    myBots.push(new Bot(random(0, width), random(0, height)));
  }
}

function draw() {
  background(186, 7, 141);
 
  stroke(255);
  strokeWeight(4);
  for (var i = 0; i < myBots.length; i++) {
    myBots[i].update();
    if (myBots[i].alive == 0) {
      myBots.splice(i, 1); // alten bot löschen
      myBots.push(new Bot(random(0, width), random(0, height))); // neuen bot erzeugen!!
    }
    myBots[i].draw();

  }  
  setCenter(width/2, height/2);
  stroke('#000');
  noFill();
  //-----------
  let increment = 0.1;
  //noLoop();
  beginShape();
  for (let a = 0; a < TWO_PI; a += increment) {
    let r1 = lr + random(-50, 10);
    let x = r1 * cos(a);
    let y = r1 * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);

  //----------


  let r = 330;
  circle(0, 0, r * 2);

  strokeWeight(32);
  stroke(252, 238, 33);
  let x = r * cos(angle);
  let y = r * sin(angle);
  point(x, y);

  angle += 0.01;

  strokeWeight(0.3);
  polarLines(3, 315, 0);
  fill(52, 158, 235);
  polarHexagon(30, 50, 0);
  
  fill(20, 179, 62);
  //noFill();
  polarHexagons(6, 40, 140);

  fill(186, 12, 6);
 // noFill();
  polarHexagons(6, 30, 240);
  fill(0);
  //noFill();
  polarHexagons(6, 20, 330);
  
}



p5.prototype.polarLine = function(_angle, _radius, _distance) {
  this.push();
  const _radians = this.radians(_angle);
  this.translate(this.sin(_radians)*_distance, this.cos(_radians)*-_distance);
  this.rotate(this.radians(_angle));
  this.line(0, _radius, 0, -_radius);
  this.pop();
}

p5.prototype.polarLines = function(_num, _radius, _distance, callback) {
  const _angle = 360/_num;
  for(let i=1; i<=_num; i++) {
    if(callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarLine(_result[0]*_result[1], _result[2], _result[3]);
    }
    else this.polarLine(i*_angle, _radius, _distance);
  }
}

// Hexagon
p5.prototype.polarHexagon = function(_angle, _radius, _distance) {
  this.push();
  const _radians = this.radians(_angle);
  this.translate(this.sin(_radians)*_distance, this.cos(_radians)*-_distance);
  this.rotate(this.radians(_angle));
  this.beginShape();
    for(let i=0; i<6; i++) {
      this.vertex(
        this.cos(this.TWO_PI*i/6)*_radius, this.sin(this.TWO_PI*i/6)*_radius
      );
    }
  this.endShape(this.CLOSE);
  this.pop();
}

p5.prototype.polarHexagons = function(_num, _radius, _distance, callback) {
  const _angle = 360/_num;
  for(let i=1; i<=_num; i++) {
    if(callback) {
      const _result = callback(i, _angle, _radius, _distance);
      this.polarHexagon(_result[0]*_result[1], _result[2], _result[3]);
    }
    else 
      this.polarHexagon(i*_angle, _radius, _distance);
  }
}

p5.prototype.setCenter=function(t,s){
  void 0===this.center?
  this.center={x:t,y:s}:
  this.translate(this.center.x=t,
  this.center.y=s)
}

class Bot{
  constructor(x,y){
    this.pos = createVector(x,y);
    this.targetpos = createVector(random(x),random(y));
    this.sped = random(0.1,5);
    this.color= color(252, 238, 33);
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