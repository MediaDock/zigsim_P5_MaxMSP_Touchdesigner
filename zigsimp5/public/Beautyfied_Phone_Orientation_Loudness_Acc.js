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
                Authorin: Hanna Züllig
*/

let socket;
let addressHandlers = {};
let micLevel = 0;
let quaternion = { x: 0, y: 0, z: 0, w: 1 };
let euler = { yaw: 0, pitch: 0, roll: 0 };
let pg;
let accelX = 0;
let accelY = 0;
let accelZ = 0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pg = createGraphics(width, height, WEBGL);
    pg.setAttributes({ alpha: true });

    // Connect to the WebSocket server
    socket = new WebSocket('ws://localhost:8081');
    socket.onopen = () => console.log("WebSocket connected");
    socket.onerror = (error) => console.log("WebSocket error:", error);
    
    // Listen for messages
    socket.onmessage = function (event) {
        let msg = JSON.parse(event.data);
        handleOSCMessage(msg);
    };

    // Setup handlers for different OSC addresses
    addressHandlers["miclevel"] = handleMicLevel;
    addressHandlers["accel"] = handleAccel;
    addressHandlers["quaternion"] = handleQuaternion;
}

function draw() {
    pg.background(0, 20);
    pg.ortho(-200, 200, -200, 200, 0.1, 1000);
    
    pg.camera(400, -400, 400,   
         0, 0, 0,     
         0, 1, 0);    

    pg.noFill();
   
    pg.push();
    
    // Device rotations using quaternion
    pg.rotateZ(-euler.yaw);
    pg.rotateY(euler.pitch);
    pg.rotateX(-euler.roll);

    // Base dimensions for the phone
    let baseX = 50;  // short side
    let baseY = 200; // long side
    let baseZ = 5;   // height (out of screen)
    
    // Scale only based on mic level
    let scale = 1 + micLevel;
    let boxX = baseX * scale;
    let boxY = baseY * scale;
    let boxZ = baseZ * scale;

    // Determine which axis has the highest acceleration
    let absX = Math.abs(accelX);
    let absY = Math.abs(accelY);
    let absZ = Math.abs(accelZ);
    
    // Set color based on highest acceleration
    if (absX >= absY && absX >= absZ) {
        // X axis has highest acceleration - Red
        pg.stroke(255, 0, 0);
    } else if (absY >= absX && absY >= absZ) {
        // Y axis has highest acceleration - Green
        pg.stroke(0, 255, 0);
    } else {
        // Z axis has highest acceleration - Blue
        pg.stroke(0, 0, 255);
    }

    // Make the stroke width respond to the magnitude of the highest acceleration
    let maxAccel = Math.max(absX, absY, absZ);
    pg.strokeWeight(1 + maxAccel * 3); // Scale stroke weight with acceleration

    pg.box(boxX, boxY, boxZ);

    pg.pop();

    image(pg, -width/2, -height/2);
    
    // Add text overlay for debugging
    drawTextOverlay();
}

function drawTextOverlay() {
    push();
    translate(-width/2, -height/2);
    textSize(16);
    fill(255);
    
    // Display mic level
    text(`Mic: ${micLevel.toFixed(2)}`, 20, 30);
    
    // Display accelerometer values
    text(`Accel X: ${accelX.toFixed(2)}`, 20, 50);
    text(`Accel Y: ${accelY.toFixed(2)}`, 20, 70);
    text(`Accel Z: ${accelZ.toFixed(2)}`, 20, 90);
    
    // Display euler angles
    text(`Yaw: ${euler.yaw.toFixed(2)}`, 20, 110);
    text(`Pitch: ${euler.pitch.toFixed(2)}`, 20, 130);
    text(`Roll: ${euler.roll.toFixed(2)}`, 20, 150);
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

function handleAccel(args) {
    accelX = args[0];
    accelY = args[1];
    accelZ = args[2];
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
