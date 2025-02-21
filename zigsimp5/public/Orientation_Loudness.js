/*
                #####                                                           
              ##########                                                        
             ###     ###                                                        
             ###     ###                                                        
             ###     ###                                                        
             ###     ###                                                        
             ###     ###                                                
             ###     ##########                                                 
             ###     ##################                                        
             ###     ###     ##############                                   
             ###     ###     ####     #######                               
             ###     ###     ####     ###   ###                                
  ######     ###     ###     ####     ###   ######                            
###########  ###     ###     ####     ###       ###                            
####     #######                      ###       ###                            
#######      ###                                 ###                            
  #####                                          ###                            
  #######                                        ###                            
     ####                                        ###                            
      ######                                     ###                            
         ###                                  #####                            
         #######                             ####                               
            ####                             ###                                                         
             #######                     #######
                ####                     ####                                   
                #############################                                   
                #############################                                   

                Tutorial can be found here: 
                https://sites.hslu.ch/werkstatt/your-smartphone-is-a-sensorpack/
*/

let socket;
let addressHandlers = {};
let micLevel = 0;
let quaternion = { x: 0, y: 0, z: 0, w: 1 };
let euler = { yaw: 0, pitch: 0, roll: 0 };
let textOverlay;
let accelHistoryX = [];
let accelHistoryY = [];
let accelHistoryZ = [];
let maxHistory = 200; // Number of points to show

function setup() {
   createCanvas(windowWidth, windowHeight, WEBGL);
   textOverlay = createGraphics(windowWidth, windowHeight);

   socket = new WebSocket('ws://localhost:8081');
   socket.onmessage = function (event) {
       let msg = JSON.parse(event.data);
       handleOSCMessage(msg);
   };

   addressHandlers["miclevel"] = handleMicLevel;
   addressHandlers["quaternion"] = handleQuaternion;
   addressHandlers["accel"] = handleAccel;
}

function draw() {
   background(0);
   
   // Mic level box (left side)
   push();
   let boxSize = map(micLevel, 0, 1, 20, 200);
   translate(-width/4, 0, 0);
   noFill();
   let redValue = map(micLevel, 0, 1, 0, 255);  // Map from white to red
   stroke(255, 255-redValue, 255-redValue);  // Fade from white to red   
   strokeWeight(1);
   box(boxSize);
   pop();


   // Accelerometer history (center)
   push();
   translate(0, 0, 0);
   strokeWeight(2);
   noFill();
   
   // X acceleration (red)
   stroke(255, 0, 0);
   beginShape();
   for (let i = 0; i < accelHistoryX.length; i++) {
      let x = map(i, 0, maxHistory, -200, 200);
      let y = map(accelHistoryX[i], -1, 1, -120, -60);
      vertex(x, y);
   }
   endShape();
   
   // Y acceleration (green)
   stroke(0, 255, 0);
   beginShape();
   for (let i = 0; i < accelHistoryY.length; i++) {
      let x = map(i, 0, maxHistory, -200, 200);
      let y = map(accelHistoryY[i], -1, 1, -30, 30);
      vertex(x, y);
   }
   endShape();
   
   // Z acceleration (blue)
   stroke(0, 0, 255);
   beginShape();
   for (let i = 0; i < accelHistoryZ.length; i++) {
      let x = map(i, 0, maxHistory, -200, 200);
      let y = map(accelHistoryZ[i], -1, 1, 60, 120);
      vertex(x, y);
   }
   endShape();
   pop();

   // Orientation axes
   push();
   translate(width/4, 0, 0);
   // Initial orientation
   rotateX(PI/2);   // Blue up
   rotateZ(PI/2);   // Red toward viewer, green to right
   // Device rotations
   rotateZ(-euler.yaw);
   rotateY(euler.pitch);
   rotateX(-euler.roll);
   drawColoredAxes();
   pop();

    push();


    //2D Text Overlay
    textOverlay.clear();
    textOverlay.textAlign(LEFT); // Left alignment for all text
    textOverlay.textSize(16);
    
// Mic level to left corner
textOverlay.textAlign(LEFT);
textOverlay.fill(255);  // White text
textOverlay.text(`Mic: ${micLevel.toFixed(2)}`, 50, 50);


// Accelerometer values centered above graph
let centerX = width/2;
textOverlay.fill(255, 0, 0);
textOverlay.text(`Accel X: ${accelHistoryX[accelHistoryX.length-1]?.toFixed(2)}`, centerX - 100, 30);
textOverlay.fill(0, 255, 0);
textOverlay.text(`Accel Y: ${accelHistoryY[accelHistoryY.length-1]?.toFixed(2)}`, centerX - 100, 50);
textOverlay.fill(0, 0, 255);
textOverlay.text(`Accel Z: ${accelHistoryZ[accelHistoryZ.length-1]?.toFixed(2)}`, centerX - 100, 70);


// Axis values to right corner
textOverlay.textAlign(LEFT);
textOverlay.fill(255, 0, 0);
textOverlay.text(`X: ${euler.roll.toFixed(2)}`, width - 150, 30);
textOverlay.fill(0, 255, 0);
textOverlay.text(`Y: ${euler.pitch.toFixed(2)}`, width - 150, 50);
textOverlay.fill(0, 0, 255);
textOverlay.text(`Z: ${euler.yaw.toFixed(2)}`, width - 150, 70);
    
    imageMode(CORNER);
    image(textOverlay, -width/2, -height/2);
    
}

function drawColoredAxes() {
   strokeWeight(3);
   
   // X axis (red)
   stroke(255, 0, 0);
   line(0, 0, 0, 100, 0, 0);
   drawArrowhead(100, 0, 0, [1,0,0]);
   
   // Y axis (green)
   stroke(0, 255, 0);
   line(0, 0, 0, 0, 100, 0);
   drawArrowhead(0, 100, 0, [0,1,0]);
   
   // Z axis (blue)
   stroke(0, 0, 255);
   line(0, 0, 0, 0, 0, 100);
   drawArrowhead(0, 0, 100, [0,0,1]);
}

function drawArrowhead(x, y, z, axis) {
   push();
   translate(x, y, z);
   if(axis[1] === 1) rotateZ(PI/2);
   if(axis[2] === 1) rotateY(-PI/2);
   beginShape();
   vertex(0, 0, 0);
   vertex(-20, -10, 0);
   vertex(-20, 10, 0);
   endShape(CLOSE);
   pop();
}

function handleOSCMessage(oscMsg) {
   const { address, args } = oscMsg;
   let addressParts = address.split('/');
   let lastPart = addressParts[addressParts.length - 1];

   if (addressHandlers[lastPart]) {
       addressHandlers[lastPart](args);
   }
}


function handleMicLevel(args) {
    micLevel = map(args[1], -60, 0, 0, 1);  
 }


function handleQuaternion(args) {
   quaternion = {
       x: args[0],
       y: args[1],
       z: args[2],
       w: args[3]
   };
   quaternionToEuler(quaternion);
}


function quaternionToEuler(q) {
   // Roll (x-axis rotation)
   let sinr_cosp = 2 * (q.w * q.x + q.y * q.z);
   let cosr_cosp = 1 - 2 * (q.x * q.x + q.y * q.y);
   euler.roll = Math.atan2(sinr_cosp, cosr_cosp);

   // Pitch (y-axis rotation)
   let sinp = 2 * (q.w * q.y - q.z * q.x);
   euler.pitch = Math.abs(sinp) >= 1 ? 
       Math.sign(sinp) * Math.PI / 2 : Math.asin(sinp);

   // Yaw (z-axis rotation)
   let siny_cosp = 2 * (q.w * q.z + q.x * q.y);
   let cosy_cosp = 1 - 2 * (q.y * q.y + q.z * q.z);
   euler.yaw = Math.atan2(siny_cosp, cosy_cosp);
}


function handleAccel(args) {
    accelHistoryX.push(args[0]);
    accelHistoryY.push(args[1]);
    accelHistoryZ.push(args[2]);
    
    if (accelHistoryX.length > maxHistory) {
        accelHistoryX.shift();
        accelHistoryY.shift();
        accelHistoryZ.shift();
    }
 }
