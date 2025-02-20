///// Instancing is the stars //////
///// I will mark the begining with a comment /////


let time = 0;  // track time passing, used to move the objects
let totX = 0;
let totY = 0;
let backR = 106;
let backG = 198;
let backB = 235;
let xTime = 0;
let yTime = 0;
let xTo = 0;
let starYstart = -1200;
let maxAngle = 77;
let camYTemp = 0;
let rotationSpeed = 0;
let planTot = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  let fov = 60.0;  // 60 degrees FOV
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
}

function draw() {
  background(backR, backG, backB);
  orbitControl(3, 3, 3);
  ambientLight(60, 60, 60);  // include some light even in shadows
  pointLight(255, 255, 255, 100, -100, 300);  
  pointLight(255, 255, 255, 1060, -3635, -600);  
  noStroke(); 

  if (time <= 8) {
    push();
    ramp();
    pop();
    bikeOnRamp();
    push();
    ramp();
    pop();
  } else if (time <= 13) {
    cameraMove();
    push();
    ramp();
    pop();
  } else if (time <= 21) { //24 -3
    changeColor();
  } else if (time <= 57) { // 73 -16
    ///// INSTANCING /////
    ///// There are several stars created per for loop /////

    for (let i = 0; i < 2; i++) {
      push();
      translate(350 + (i * 10), starYstart - (i * 800) - 200, -800);
      star();
      pop();
    }
    for (let i = 0; i < 2; i++) {
      push();
      translate(900 - (i * 10), starYstart - (i * 800) - 20, -800);
      star();
      pop();
    }
    for (let i = 0; i < 2; i++) {
      push();
      translate(600 + (i * 10), starYstart - (i * 800) + 100, -800);
      star();
      pop();
    }
    for (let i = 0; i < 2; i++) {
      push();
      translate(1400 + (i * 10), starYstart - (i * 800) + 100, -800);
      star();
      pop();
    }
    starFall();
  } else if (time <= 62) { // 78 -16
    maxAngle -= .5;
    maxAngle = max(0, maxAngle);
    push();
    translate(totX, totY, 0);
    rotateZ(-1 * toRad(maxAngle));
    scale(0.7);
    drawWholeBike(time);
    pop();
  } else if (time <= 69) { // 85 -16
    camYTemp = totY + (5 * (time - 62));    //////// changes with time
    camera(totX, camYTemp, 130, totX, camYTemp, 0, 0, 1, 0);
    push();
    translate(totX, totY, 0);
    scale(0.7);
    drawWholeBike(time);
    pop();
  } else if (time <= 72) { // 88 -16
    camera(totX, camYTemp, 130, totX, camYTemp, 0, 0, 1, 0);
    push();
    translate(totX, totY, 0);
    scale(0.7);
    drawWholeBike(time);
    pop();
  } else if (time <= 74) { //90 -16
    push();
    translate(totX, totY, 0);
    scale(0.7);
    rotationSpeed *= 0.999;
    drawWholeBike(-1 * rotationSpeed);
    pop();
  } else if (time <= 88.2) { // 104.2 -16
    planTot = ((time - 74) * 10);  ////////// changes with time
    stillBike();
  } else { // 120 -16
    stillBike();
    //let angle = (time - 88.2) * 0.5;    ////////// changes with time
    //let camY = camYTemp + (cos(angle) * 130);
    //let camZ = 130 + (sin(angle) * 130);
    //camera(totX, camY, camZ, totX, camYTemp, 0, 0, 1, 0);
  }
  console.log(time);

  time += 0.03;  // update the time
}

function stillBike() {
  push();
  translate(totX, totY, 0);
  scale(0.7);
  drawWholeBike(0);
  pop();

  push();
  translate(956, -2606.5 - planTot, -30);
  scale(4);
  planet();
  pop();
}

function starFall() {
    angle = toRad(77);
    totX += 2 * cos(angle);
    totY -= 2 * sin(angle);
    constUp();
    camera(totX, totY, 130, totX, totY, 0, 0, 1, 0);
}

//goes in a bit more and and changes the background color
function changeColor() {
  let colorChange = (time) * .05;
  backR = max(16, backR - colorChange);
  backG = max(15, backG - colorChange);
  backB = max(36, backB - colorChange);

  let xTemp = min(totX, (time - 13) * 70 + xTime);  
  camera(xTemp, yTime, 130, xTo, yTime, 0, 0, 1, 0);
  constUp();
}

//bike goes up and camera goes in 
function cameraMove() {
    angle = toRad(77);
    totX += 2 * cos(angle);
    totY -= 2 * sin(angle);
    xTime = min(totX, (time - 8) * 70 - 100);
    yTime = max(totY, (time - 8) * -100);
    xTo = min(totX, xTime + 200);
    camera(xTime, yTime, 130, xTo, yTime, 0, 0, 1, 0);
    constUp();
}

//constant up motion
function constUp() {
    push();
    translate(totX, totY, 0);
    rotateZ(-angle);
    scale(0.7);
    drawWholeBike(time);
    pop();
}

// bike goes up the ramp
function bikeOnRamp() {
  camera(-100, 0, 130, 100, 0, 0, 0, 1, 0);

  let flatRamp = 4.5;
  let seg1 = 4.8;
  let seg2 = 5.3;
  let seg3 = 5.8;
  let seg4 = 6.5;
  let seg5 = 7;
  let seg6 = 7.5;
  let seg7 = 8;
  
  // 5 10 18 30 45 60 77
  push();
  translate(0, 18, 0);

  let angle = 0;
  let speed = 2;
  if (time <= flatRamp) {
    totX += time * 0.5;
    push();
    translate(totX, 0, 0);
    scale(0.7)
    drawWholeBike(time);
    pop();
  } else if (time <= seg1) {
    angle = toRad(5);
    totX += speed * cos(angle);
    totY -= speed * sin(angle);
    push();
    translate(totX, totY, 0);
    rotateZ(-angle);
    scale(0.7);
    drawWholeBike(time);
    pop();
  } else if (time <= seg2) {
    angle = toRad(10);
    totX += speed * cos(angle);
    totY -= speed * sin(angle);
    push();
    translate(totX, totY, 0);
    rotateZ(-angle);
    scale(0.7);
    drawWholeBike(time);
    pop();
  } else if (time <= seg3) {
    angle = toRad(18);
    totX += speed * cos(angle);
    totY -= speed * sin(angle);
    push();
    translate(totX, totY, 0);
    rotateZ(-angle);
    scale(0.7);
    drawWholeBike(time);
    pop();
  }else if (time <= seg4) {
    angle = toRad(30);
    totX += speed * cos(angle);
    totY -= speed * sin(angle);
    push();
    translate(totX, totY, 0);
    rotateZ(-angle);
    scale(0.7);
    drawWholeBike(time);
    pop();
  }else if (time <= seg5) {
    angle = toRad(45);
    totX += speed * cos(angle);
    totY -= speed * sin(angle);
    push();
    translate(totX, totY, 0);
    rotateZ(-angle);
    scale(0.7);
    drawWholeBike(time);
    pop();
  }else if (time <= seg6) {
    angle = toRad(60);
    totX += speed * cos(angle);
    totY -= speed * sin(angle);
    push();
    translate(totX, totY, 0);
    rotateZ(-angle);
    scale(0.7);
    drawWholeBike(time);
    pop();
  } else if (time <= seg7) {
    angle = toRad(77);
    totX += speed * cos(angle);
    totY -= speed * sin(angle);
    push();
    translate(totX, totY, 0);
    rotateZ(-angle);
    scale(0.7);
    drawWholeBike(time);
    pop();
  }
  pop();
}

function drawWholeBike(time) {
  //back wheel
  push();
  translate(-25, 20);
  push ();
  rotateZ(time);
  Wheel();
  pop();
  pop();
  
  //front wheel & frame
  push();
  translate(25, 20);
  push();
  rotateZ(time);
  Wheel();
  pop();

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

  push();
  translate(-8, 19, 0);
  rotateZ(2 * time);
  pedalHolder();
  pop();

  push();
  translate(-8, 19, 0);
  rotateZ(2 * time);
  pedals(time);
  pop();
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

function pedals(time) {
  setPurpleTexture();
  push();
  let sign = 1;
  for (let i = 0; i < 2; i ++) {
    push();
    translate(0, sign * 8, sign * 7);
    push();
    rotateZ(-2 * time)
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
    rotateZ(-2 * time)
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



/////
/////    Textures
/////


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

/////
/////    star
/////

function star() {
  push();
  fill('yellow');
  sphere(10);
  for(let i = 0; i < 16; i++) {
    push();
    rotateZ(i * PI / 8);
    translate(0, 30, 0);
    cone(8, 50);
    pop();
  }
  pop(); 
}

/////
/////    planet
/////

function planet() {
  push();
  fill('orange');
  sphere(10);
  pop();

  push();
  fill('orange');
  for (let j = 0; j < 8; j++) {
    rotateZ(j * PI / 5);
    for(let i = 0; i < 6; i++) {
      push();
      rotateX(i * PI / 3);
      translate(0, 0, 9);
      torus(1, 1);
      pop();
    }
  }
  pop();
 

  push();
  fill('grey');
  rotateX(toRad(90));
  torus(15, 1, 24, 3);
  pop();
}

/////
/////    ramp
/////

function ramp() {
  fill('grey');
  push();
  //base road
  translate(60, 50, 0);
  box(200, 20, 30);
  pop();

  //ramp
  fill('grey')
  push();
  translate(175, 48.5, 0);
  push();
  rotateZ(-toRad(5));
  box(40, 20, 30);
  pop();

  translate(40, -5.4, 0);
  push();
  rotateZ(-toRad(10));
  box(40, 20, 30);
  pop();

  translate(40, -10, 0);
  push();
  rotateZ(-toRad(18));
  box(40, 20, 30);
  pop();

  translate(38, -17, 0);
  push();
  rotateZ(-toRad(30));
  box(40, 20, 30);
  pop();

  translate(33.5, -25.5, 0);
  push();
  rotateZ(-toRad(45));
  box(40, 20, 30);
  pop();

  translate(25.5, -33.2, 0);
  push();
  rotateZ(-toRad(60));
  box(40, 20, 30);
  pop();

  translate(16, -45, 0);
  push();
  rotateZ(-toRad(77));
  box(60, 20, 30);
  pop();


  pop();
}
