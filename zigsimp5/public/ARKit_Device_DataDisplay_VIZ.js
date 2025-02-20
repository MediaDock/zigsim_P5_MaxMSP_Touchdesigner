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


let sensorData = {
    arkit: {
        deviceInfo: {},
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0, w: 1},
        featurePoints: []
    }
};

let socket;
let textOverlay;
let viewport3D;

// Declare variables but initialize them in setup
let angleX;
let angleY;
let distance;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textOverlay = createGraphics(windowWidth, windowHeight/2);
    viewport3D = createGraphics(windowWidth, windowHeight/2, WEBGL);
    
    // Initialize camera values in setup
    angleX = 0;  // p5.js PI constant
    angleY = PI;
    distance = 200;
    
    connectWebSocket();
}

function mouseDragged() {
    if (mouseY > height/2) {
        angleY += (mouseX - pmouseX) * 0.01;
        angleX += (mouseY - pmouseY) * 0.01;
    }
}

function mouseWheel(event) {
    if (mouseY > height/2) {
        distance += event.delta * 0.5;
        distance = constrain(distance, 50, 500);
        return false;
    }
}

function connectWebSocket() {
    socket = new WebSocket('ws://localhost:8081');
    socket.onopen = () => console.log('Connected to WebSocket');
    socket.onmessage = handleMessage;
    socket.onerror = (error) => console.error('WebSocket error:', error);
    socket.onclose = () => setTimeout(connectWebSocket, 5000);
}

function handleMessage(event) {
    try {
        let msg = JSON.parse(event.data);
        let type = msg.address.split('/').pop().toLowerCase();
        const args = Array.isArray(msg.args) ? msg.args : [];

        switch(type) {
            case 'deviceinfo':
                sensorData.arkit.deviceInfo = args[0] || {};
                break;
            case 'arkitposition':
                sensorData.arkit.position = {
                    x: args[0] || 0,
                    y: args[1] || 0,
                    z: args[2] || 0
                };
                break;
            case 'arkitrotation':
                sensorData.arkit.rotation = {
                    x: args[0] || 0,
                    y: args[1] || 0,
                    z: args[2] || 0,
                    w: args[3] || 1
                };
                break;
            case 'arkitfeaturepoints':
                const points = [];
                if (args && args.length > 0) {
                    const pointsArray = Array.isArray(args[0]) ? args[0] : args;
                    for (let i = 0; i < pointsArray.length; i += 3) {
                        points.push({
                            x: pointsArray[i],
                            y: pointsArray[i + 1],
                            z: pointsArray[i + 2]
                        });
                    }
                }
                sensorData.arkit.featurePoints = points;
                break;
        }
    } catch (error) {
        console.error('Error handling message:', error);
    }
}

function formatNumber(num) {
    if (num === undefined || num === null || typeof num !== 'number') {
        return '0.000'.padStart(8, ' ');
    }
    return num.toFixed(3).padStart(8, ' ');
}

function draw() {
    background(0);
    drawTextOverlay();
    draw3DView();
}

function drawTextOverlay() {
    textOverlay.clear();
    textOverlay.textSize(16);
    textOverlay.fill(255);
    
    const columnWidth = width / 5;
    const rowHeight = 30;
    const padding = 10;
    let row = 1;
    let col = 0;

    // Title
    textOverlay.textStyle(BOLD);
    textOverlay.text("AR Kit Data Display", padding, row * rowHeight);
    textOverlay.textStyle(NORMAL);
    row += 2;

    // Position
    col = 0;
    const pos = sensorData.arkit.position;
    textOverlay.fill(200);
    textOverlay.text('AR Position', col * columnWidth + padding, row * rowHeight);
    textOverlay.fill(255);
    textOverlay.text(`x: ${formatNumber(pos.x)}`, (col + 1) * columnWidth + padding, row * rowHeight);
    textOverlay.text(`y: ${formatNumber(pos.y)}`, (col + 2) * columnWidth + padding, row * rowHeight);
    textOverlay.text(`z: ${formatNumber(pos.z)}`, (col + 3) * columnWidth + padding, row * rowHeight);
    row++;

    // Rotation
    col = 0;
    const rot = sensorData.arkit.rotation;
    textOverlay.fill(200);
    textOverlay.text('AR Rotation', col * columnWidth + padding, row * rowHeight);
    textOverlay.fill(255);
    textOverlay.text(`x: ${formatNumber(rot.x)}`, (col + 1) * columnWidth + padding, row * rowHeight);
    textOverlay.text(`y: ${formatNumber(rot.y)}`, (col + 2) * columnWidth + padding, row * rowHeight);
    textOverlay.text(`z: ${formatNumber(rot.z)}`, (col + 3) * columnWidth + padding, row * rowHeight);
    textOverlay.text(`w: ${formatNumber(rot.w)}`, (col + 4) * columnWidth + padding, row * rowHeight);
    row++;

    // Feature Points Count
    textOverlay.fill(200);
    textOverlay.text(`Feature Points: ${sensorData.arkit.featurePoints.length}`, padding, row * rowHeight);
    
    // Show first few feature points
    if (sensorData.arkit.featurePoints.length > 0) {
        row++;
        textOverlay.fill(150);
        textOverlay.text('Sample Points:', padding, row * rowHeight);
        
        const pointsToShow = Math.min(3, sensorData.arkit.featurePoints.length);
        for (let i = 0; i < pointsToShow; i++) {
            row++;
            const p = sensorData.arkit.featurePoints[i];
            textOverlay.text(`Point ${i}: x: ${formatNumber(p.x)} y: ${formatNumber(p.y)} z: ${formatNumber(p.z)}`,
                padding + 20, row * rowHeight);
        }
    }
    
    row++;
    textOverlay.fill(150);
    textOverlay.text('Drag in bottom half to rotate view. Scroll to zoom.', padding, row * rowHeight);
    
    image(textOverlay, 0, 0);
}

function draw3DView() {
    viewport3D.clear();
    viewport3D.background(0);
    
    // Calculate camera position - corrected for proper left/right orientation
    let camX = -distance * sin(angleY) * cos(angleX);  // Negative X to correct left/right
    let camY = -distance * sin(angleX);  // Negative Y to keep view flipped up
    let camZ = -distance * cos(angleY) * cos(angleX);  // Negative Z to maintain depth direction
    
    // Set up camera with flipped up vector
    viewport3D.camera(camX, camY, camZ, 0, 0, 0, 0, -1, 0);  // Changed up vector to (0, -1, 0)
    
    // Draw coordinate axes
    viewport3D.strokeWeight(2);
    viewport3D.stroke(255, 0, 0); // X axis - red
    viewport3D.line(0, 0, 0, 50, 0, 0);
    viewport3D.stroke(0, 255, 0); // Y axis - green
    viewport3D.line(0, 0, 0, 0, 50, 0);
    viewport3D.stroke(0, 0, 255); // Z axis - blue
    viewport3D.line(0, 0, 0, 0, 0, 50);
    
    // Draw reference grid
    viewport3D.stroke(40);
    viewport3D.strokeWeight(1);
    for(let i = -50; i <= 50; i += 10) {
        viewport3D.line(i, 0, -50, i, 0, 50);
        viewport3D.line(-50, 0, i, 50, 0, i);
    }
    
    // Draw feature points
    viewport3D.stroke(255);
    viewport3D.strokeWeight(4);
    sensorData.arkit.featurePoints.forEach(point => {
        viewport3D.push();
        viewport3D.translate(point.x * 100, point.y * 100, point.z * 100);
        viewport3D.point(0, 0, 0);
        viewport3D.pop();
    });
    
    image(viewport3D, 0, height/2);
}