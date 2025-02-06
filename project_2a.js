// Sample code for Project 2A
// Draws 3D Simple Shapes (box, cylinder, sphere, cone, torus)

let time = 0;  // track time passing, used to move the objects
let debOn = false;

function setup() {
  createCanvas(600, 600, WEBGL);
  let fov = 60.0;  // 60 degrees FOV
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
  //camera(0, 10, 100, 0, 10, 0, 0, 1, 0);  // from, at, up
}

// called repeatedly to draw new per-frame images
function draw() {
  background(255); 
  //orbitControl(3, 3, 3);
  let x = 100 * cos(time * 0.1);
  let z = 100 * sin(time * 0.1);
  camera(x, 10, z, 0, 10, 0, 0, 1, 0);  // from, at, up
  ambientLight(60, 60, 60);  // include some light even in shadows
  pointLight(255, 255, 255, 100, -100, 300);  // set light position
  noStroke();  // don't draw polygon outlines

  
  //back wheel
  push();
  translate(-25, 20);
  Wheel();
  pop();
  
  //front wheel & frame
  push();
  translate(25, 20);
  Wheel();
  frontWheelHolder(1);
  frontWheelHolder(-1);
  pop();

  mainBikeFrame();

  push();
  translate(-12, 0, 0);
  scale(.4, .4, .5);
  rotateZ(-1 * toRad(10));
  seat();
  pop();

  handleBars();

  wheelCover(25, 0);
  wheelCover(-25, 1);

  backSupport(1);
  backSupport(-1);

  pedalHolder();

  pedals();

  time += 0.03;  // update the time
}

function toRad(deg) {
  return deg * PI / 180;
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('your_object.jpg');
  }
}

function Wheel() {
  //Tire and metal holder
  setBlackTexture()
  torus(10, 1);
  setGreyTexture();
  torus(9.5, 1, 24, 5);

  //center wheel
  setGreyTexture();
  push();
  rotateX(PI / 2);
  cylinder(2, 1);
  pop();

  //axel
  fill(120)
  push();
  rotateX(PI / 2);
  cylinder(0.5, 2);
  pop();

  // near spokes
  setGreyTexture();
  push();
  scale(0.20);
  for(let i = 0; i < 16; i++) {
    push();
    rotateZ(i * PI / 8);
    translate(0, 26, 0)
    cylinder(1, 35);
    pop();
  }
  pop();

  setBlackTexture()
  let numBumps = 40;
  for (let i = 0; i < numBumps; i++) {
    push();
    rotateZ(i * 2 * PI / numBumps);
    translate(10.8, 0, 0);
    ellipsoid(1, 1, 1, 5, 3);
    pop();
  } 
}

function frontWheelHolder(sign) {
  setBlueTexture();

  //p1 
  push();
  translate(-0.3 ,0, sign * 1.5);
  rotateX(sign * toRad(110));
  rotateZ(toRad(10));
  cylinder(0.5, 3);
  pop();

  //p2
  push();
  translate(-2.9 , -2.5, sign * 3);
  rotateZ(-1 * toRad(50));
  cylinder(.5, 6);
  pop();

  //joint 1-2
  push();
  translate(-0.57, -0.55, sign * 2.99);
  sphere(0.5);
  pop();

  //p3 
  push();
  translate(-6.35 , -7.6, sign * 3);
  rotateZ(-1 * toRad(20));
  cylinder(.7, 7);
  pop();

  //joint 2-3
  push();
  translate(-5.1, -4.17, sign * 3);
  sphere(0.7);
  pop();

  //p4 
  push();
  translate(-7.55 , -14.1, sign * 1.7);
  rotateX(sign * toRad(23));
  cylinder(.7, 6.5);
  pop();

  //joint 3-4
  push();
  translate(-7.57, -11, sign * 3);
  sphere(0.7);
  pop();
}

function mainBikeFrame() {
  setBlueTexture();

  // joint from front wheel to frame
  push();
  translate(17.5, 2.6, 0);
  sphere(1);
  pop();

  // connection from wheel frame to handle bars 
  push();
  translate(14.2, -4.45, 0);
  rotateZ(-1 * toRad(25));
  cylinder(1, 15);
  pop();

  // seat holder
  push();
  translate(-11.6, 10.2, 0);
  rotateZ(-1 * toRad(20));
  cylinder(1, 20);
  pop();

  // cross bar low joint 
  push();
  translate(-8.15, 19.6, 0);
  sphere(1);
  pop();

  //cross bar low
  push();
  translate(4, 9.8, 0);
  rotateZ(toRad(51));
  cylinder(1, 31);
  pop();

  //cross bar high
  push();
  translate(0, 0.5, 0);
  rotateZ(toRad(60));
  cylinder(1, 29);
  pop();
}

function seat() {
  setPurpleTexture();
  let sign = 1;
  //front sides
  for (let i = 0; i < 2; i++) {
    push();
    translate(0, 0, sign * 2.4);
    rotateZ(toRad(90));
    cylinder(3 , 10);
    pop();
    sign *= -1;
  }
  // front round
  push();
  translate(5, 0.15, 0);
  rotateX(toRad(90));
  torus(2.1, 3.2);
  pop();
  
  // front top
  push();
  translate(1, -3, 0);
  rotateX(toRad(90));
  plane(10, 4);
  pop();

  //connection & back of seat
  for (let i = 0; i < 2; i++) {
    push();
    translate(-8, 0.15, sign * 3);
    rotateX(toRad(90));
    torus(2.1, 3.2);
    pop();

    push();
    translate(-12, 0, sign * 5);
    rotateZ(toRad(90));
    cylinder(3 , 10);
    pop();

    push();
    translate(-18, 0.15, sign * 3);
    rotateX(toRad(90));
    torus(2.1, 3.2);
    pop();
    sign *= -1;
  }

  // back top
  push();
  translate(-12, -3, 0);
  rotateX(toRad(90));
  plane(15, 10);
  pop();
}

function handleBars() {
  setGreyTexture();
  push();
  translate(11, -11, 0);
  rotateX(toRad(90));
  cylinder(0.8, 8);
  pop();

  let sign = 1;
  for (let i = 0; i < 2; i++) {
    setGreyTexture();
    push();
    translate(10.6, -11.6, sign * 5.5);
    rotateX(-1 * sign * toRad(70));
    rotateZ(-1 * toRad(10));
    cylinder(0.8, 4);
    pop();

    push();
    translate(8.85, -12.4, sign * 8.55);
    rotateX(-1 * sign * toRad(80));
    rotateZ(-1 * toRad(50));
    cylinder(0.8, 4);
    pop();

    push();
    translate(10.3, -12.2, sign * 7.2);
    sphere(0.8);
    pop();

    setPurpleTexture();
    push();
    translate(5.2, -13, sign * 11.65);
    rotateX(-1 * sign * toRad(80));
    rotateZ(-1 * toRad(50));
    cylinder(1, 6);
    pop();
    sign *= -1;
  }
}

function wheelCover(x, num) {
  push();
  setBlueTexture();
  translate(x, 20);
  
  for (i = 0; i < (5 + num * 4); i ++) {
    push();
    rotateZ((-i * PI / 8) - (num * 3 * PI / 2));
    push();
    translate(0, -12.2, 0);
    box(5,0.5,2);
    pop();

    push();
    translate(0, -11.5, 1.5);
    rotateX(-1 * toRad(45));
    box(5,0.5,2);
    pop();

    push();
    translate(0, -11.5, -1.5);
    rotateX(toRad(45));
    box(5,0.5,2);
    pop();
    pop();
  }
  pop();
}

function backSupport(sign) {
  setBlueTexture();
  push();
  translate(-24.8, 20);
  //p1 
  push();
  translate(-0.3 ,0, sign * 1.5);
  rotateX(sign * toRad(110));
  rotateZ(-1 * toRad(10));
  cylinder(0.5, 3);
  pop();
  // bottom support 
  push();
  translate(6.75 , -0.5, sign * 3);
  rotateZ(toRad(89.6));
  cylinder(.5, 13.5);
  pop();
  // top support
  push();
  translate(4.78 , -5.35, sign * 3);
  rotateZ(toRad(45.5));
  rotateX(toRad(0.5));
  cylinder(.5, 13.5);
  pop();
  // joint (wheel)
  push();
  translate(0, -0.5, sign * 3);
  sphere(0.5);
  pop();
  //bottom connection 
  push();
  translate(14.9 ,-0.45, sign * 1.6);
  rotateY(sign * toRad(45));
  rotateZ(toRad(95));
  cylinder(0.7, 3.4);
  pop();
  // bottom joint
  push();
  translate(13.68, -0.58, sign * 2.8);
  sphere(0.7);
  pop();
  //top connection 
  push();
  translate(10.8 ,-11, sign * 1.6);
  rotateY(sign * toRad(45));
  rotateZ(toRad(57));
  cylinder(0.7, 3.5);
  pop();
  // top joint
  push();
  translate(9.67, -9.98, sign * 2.71);
  sphere(0.7);
  pop();

  pop();
}

function pedalHolder() {
  setGreyTexture();
  push();
  translate(-8, 19, 0);
  // main axil
  push();
  rotateX(toRad(90));
  cylinder(0.5, 6)
  pop();

  let sign = 1;
  for (let i = 0; i < 2; i++) {
    //axil joints
    push();
    translate(0, 0, sign * 3);
    sphere(0.5)
    pop();
    // middle pedal connections
    push();
    translate(0, sign * 4, sign * 4.1);
    rotateX((((sign - 1) / 2) * toRad(180))  + toRad(15));
    cylinder(.5, 8);
    pop();
    // middle pedal connection joints
    push();
    translate(0, sign * 8, sign * 5.17);
    sphere(0.5)
    pop();
    //pedal connection 
    push();
    translate(0, sign * 8, sign * 6);
    rotateX(toRad(90));
    cylinder(0.5, 2)
    pop();

    sign *= -1;
  }
  pop();
}

function pedals() {
  setPurpleTexture();

  push();

  translate(-8, 19, 0);
  //outside of pedals 
  let sign = 1;
  for (let i = 0; i < 2; i ++) {
    push();
    translate(0, sign * 8, sign * 7);
    //closer edge
    push();
    rotateZ(toRad(90));
    cylinder(0.6, 4);
    pop();
    //closer joints
    push();
    translate(-2, 0, 0);
    sphere(.6);
    translate(4, 0, 0);
    sphere(.6);
    pop();

    translate(0, 0, sign * 6);
    //further edge
    push();
    rotateZ(toRad(90));
    cylinder(0.6, 4);
    pop();
    //further joints
    push();
    translate(-2, 0, 0);
    sphere(.6);
    translate(4, 0, 0);
    sphere(.6);
    pop();

    pop();

    //sides
    push();
    translate(-2, sign * 8, sign * 10);
    push();
    rotateX(toRad(90));
    cylinder(.6, 6);
    pop();
    translate(4, 0, 0);
    push();
    rotateX(toRad(90));
    cylinder(.6, 6);
    pop();
    pop();
    sign *= -1;
  }

  for (let i = 0; i < 2; i ++) {
    push();
    translate(0, sign * 8, sign * 7);
    for (let j = 0; j < 3; j ++){
      translate(0, 0, sign * 1.5 );
      push();
      rotateZ(toRad(90));
      cylinder(0.5, 4);
      pop();
    }
    pop();
    sign *= -1;
  }
  pop(); 
}

function setBlueTexture() {
  fill(0, 206, 209);
  specularMaterial(255);
  shininess(20);
  metalness(1);
}

function setPurpleTexture() {
  fill(160, 45, 186);
  specularMaterial(0);
  shininess(1);
  metalness(1);
}

function setGreyTexture() {
  fill(180);
  specularMaterial(255);
  shininess(20);
  metalness(10);
}

function setBlackTexture() {
  fill(70);
  specularMaterial(0);
  shininess(1);
  metalness(1);
}