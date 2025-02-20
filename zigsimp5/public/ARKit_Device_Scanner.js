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
        featurePoints: [],
        accumulatedPoints: []
    }
};

const MAX_POINTS = 10000;
let socket;
let textOverlay;
let viewport3D;
let angleX;
let angleY;
let distance;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textOverlay = createGraphics(windowWidth, windowHeight);
    viewport3D = createGraphics(windowWidth, windowHeight, WEBGL);
    
    // Initialize camera values
    angleX = 0;
    angleY = PI;  // Start with blue axis towards us, red to the left
    distance = 300;
    
    connectWebSocket();
}

function mouseDragged() {
    angleY += (mouseX - pmouseX) * 0.01;
    angleX += (mouseY - pmouseY) * 0.01;
}

function mouseWheel(event) {
    distance += event.delta * 0.5;
    distance = constrain(distance, 50, 800);
    return false;
}

function keyPressed() {
    if (key === 'c' || key === 'C') {
        sensorData.arkit.accumulatedPoints = [];
    }
    if (key === 's' || key === 'S') {
        savePointCloud();
    }
}

function savePointCloud() {
    let plyHeader = 'ply\n';
    plyHeader += 'format ascii 1.0\n';
    plyHeader += `element vertex ${sensorData.arkit.accumulatedPoints.length}\n`;
    plyHeader += 'property float x\n';
    plyHeader += 'property float y\n';
    plyHeader += 'property float z\n';
    plyHeader += 'end_header\n';

    // Create vertex list
    let vertexList = sensorData.arkit.accumulatedPoints.map(point => 
        `${-point.x} ${point.y} ${point.z}`  // Negate x coordinate to match visualization
    ).join('\n');

    // Combine header and vertices
    let plyContent = plyHeader + vertexList;
    
    // Create and save file with timestamp
    let timestamp = year() + nf(month(), 2) + nf(day(), 2) + '_' + nf(hour(), 2) + nf(minute(), 2) + nf(second(), 2);
    saveStrings(plyContent.split('\n'), 'pointcloud_' + timestamp + '.ply');
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

        if (type === 'arkitfeaturepoints') {
            const points = [];
            if (args && args.length > 0) {
                const pointsArray = Array.isArray(args[0]) ? args[0] : args;
                for (let i = 0; i < pointsArray.length; i += 3) {
                    const point = {
                        x: pointsArray[i],
                        y: pointsArray[i + 1],
                        z: pointsArray[i + 2]
                    };
                    points.push(point);
                    
                    // Add to accumulated points if it's not too close to existing points
                    let isUnique = true;
                    for(let existingPoint of sensorData.arkit.accumulatedPoints) {
                        const dx = existingPoint.x - point.x;
                        const dy = existingPoint.y - point.y;
                        const dz = existingPoint.z - point.z;
                        const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
                        if(distance < 0.01) {
                            isUnique = false;
                            break;
                        }
                    }
                    
                    if(isUnique) {
                        sensorData.arkit.accumulatedPoints.push(point);
                        if(sensorData.arkit.accumulatedPoints.length > MAX_POINTS) {
                            sensorData.arkit.accumulatedPoints.shift();
                        }
                    }
                }
            }
            sensorData.arkit.featurePoints = points;
        }
    } catch (error) {
        console.error('Error handling message:', error);
    }
}

function draw() {
    // Draw 3D view first (fullscreen)
    draw3DView();
    // Draw text overlay on top
    drawTextOverlay();
}

function drawTextOverlay() {
    textOverlay.clear();
    textOverlay.textSize(16);
    
    const padding = 10;
    let row = 1;
    const rowHeight = 30;

    // Semi-transparent background for better text readability
    textOverlay.fill(0, 0, 0, 150);
    textOverlay.noStroke();
    textOverlay.rect(0, 0, textOverlay.width, rowHeight * 5);

    // Title and Points Count
    textOverlay.textStyle(BOLD);
    textOverlay.fill(255);
    textOverlay.text("AR Kit Point Cloud Scanner", padding, row * rowHeight);
    row += 2;
    
    textOverlay.textStyle(NORMAL);
    textOverlay.fill(200);
    textOverlay.text(`Accumulated Points: ${sensorData.arkit.accumulatedPoints.length}`, padding, row * rowHeight);
    row++;
    
    textOverlay.fill(150);
    textOverlay.text('Press C to clear points | S to save PLY | Drag to rotate | Scroll to zoom', padding, row * rowHeight);
    
    image(textOverlay, 0, 0);
}

function draw3DView() {
    viewport3D.clear();
    viewport3D.background(0);
    
    // Calculate camera position with corrected orientation
    let camX = -distance * sin(angleY) * cos(angleX);
    let camY = -distance * sin(angleX);
    let camZ = -distance * cos(angleY) * cos(angleX);
    
    // Set up camera with flipped up vector
    viewport3D.camera(camX, camY, camZ, 0, 0, 0, 0, -1, 0);
    
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
    
    // Draw all points
    viewport3D.stroke(100, 100, 255); // Light blue for accumulated points
    viewport3D.strokeWeight(2);
    sensorData.arkit.accumulatedPoints.forEach(point => {
        viewport3D.push();
        viewport3D.translate(-point.x * 100, point.y * 100, point.z * 100);  // Negate x coordinate for correct orientation
        viewport3D.point(0, 0, 0);
        viewport3D.pop();
    });
    
    // Draw current points
    viewport3D.stroke(255); // White for current points
    viewport3D.strokeWeight(4);
    sensorData.arkit.featurePoints.forEach(point => {
        viewport3D.push();
        viewport3D.translate(-point.x * 100, point.y * 100, point.z * 100);  // Negate x coordinate for correct orientation
        viewport3D.point(0, 0, 0);
        viewport3D.pop();
    });
    
    image(viewport3D, 0, 0);
}