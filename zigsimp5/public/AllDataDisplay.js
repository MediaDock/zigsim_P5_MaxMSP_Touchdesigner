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
    accel: {x: 0, y: 0, z: 0},
    gravity: {x: 0, y: 0, z: 0},
    gyro: {x: 0, y: 0, z: 0},
    quaternion: {x: 0, y: 0, z: 0, w: 1},
    compass: {heading: 0, orientation: 'Portrait'},
    gps: {lat: 0, lon: 0, alt: 0},
    touches: [
        {x: 0, y: 0, radius: 0, force: 0},
        {x: 0, y: 0, radius: 0, force: 0},
        {x: 0, y: 0, radius: 0, force: 0},
        {x: 0, y: 0, radius: 0, force: 0},
        {x: 0, y: 0, radius: 0, force: 0}
    ],
    micLevel: 0,
    battery: 0
};

let socket;
let textOverlay;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textOverlay = createGraphics(windowWidth, windowHeight);
    connectWebSocket();
}


function connectWebSocket() {
    console.log('4444444444...');
    console.log('Attempting to connect to WebSocket...');
    socket = new WebSocket('ws://localhost:8081');

    socket.onopen = function(event) {
        console.log('WebSocket connection established');
    };

    socket.onmessage = handleMessage;

    socket.onerror = function(error) {
        console.error('WebSocket error:', error);
    };

    socket.onclose = function(event) {
        console.log('WebSocket connection closed:', event.code, event.reason);
        setTimeout(connectWebSocket, 5000);
    };
}

function handleMessage(event) {
    try {
        let msg = JSON.parse(event.data);
        let address = msg.address;
        let type = address.split('/').pop();
        
        // Extract touch index if it's a touch message
        let touchIndex = -1;
        if (type.startsWith('touch')) {
            touchIndex = parseInt(type.charAt(type.length - 2));
        }

        // Ensure msg.args exists and has values
        const args = Array.isArray(msg.args) ? msg.args : [];

        switch(true) {
            case /^touch\d1$/.test(type):  // X coordinate
                if (touchIndex >= 0 && touchIndex < sensorData.touches.length) {
                    sensorData.touches[touchIndex].x = args[0] || 0;
                }
                break;
            case /^touch\d2$/.test(type):  // Y coordinate
                if (touchIndex >= 0 && touchIndex < sensorData.touches.length) {
                    sensorData.touches[touchIndex].y = args[0] || 0;
                }
                break;
            case /^touchradius\d$/.test(type):
                touchIndex = parseInt(type.charAt(type.length - 1));
                if (touchIndex >= 0 && touchIndex < sensorData.touches.length) {
                    sensorData.touches[touchIndex].radius = args[0] || 0;
                }
                break;
            case /^touchforce\d$/.test(type):
                touchIndex = parseInt(type.charAt(type.length - 1));
                if (touchIndex >= 0 && touchIndex < sensorData.touches.length) {
                    sensorData.touches[touchIndex].force = args[0] || 0;
                }
                break;
            case type === 'accel':
                sensorData.accel = {x: args[0] || 0, y: args[1] || 0, z: args[2] || 0};
                break;
            case type === 'gravity':
                sensorData.gravity = {x: args[0] || 0, y: args[1] || 0, z: args[2] || 0};
                break;
            case type === 'gyro':
                sensorData.gyro = {x: args[0] || 0, y: args[1] || 0, z: args[2] || 0};
                break;
            case type === 'quaternion':
                sensorData.quaternion = {
                    x: args[0] || 0, 
                    y: args[1] || 0, 
                    z: args[2] || 0, 
                    w: args[3] || 1
                };
                break;
            case type === 'compass':
                sensorData.compass = {
                    heading: args[0] || 0,
                    orientation: args[1] === 1 ? 'Face-up' : 'Portrait'
                };
                break;
            case type === 'gps':
                sensorData.gps = {
                    lat: args[0] || 0, 
                    lon: args[1] || 0, 
                    alt: args[2] || 0
                };
                break;
            case type === 'miclevel':
                sensorData.micLevel = args[1] || 0;
                break;
            case type === 'battery':
                sensorData.battery = args[0] || 0;
                break;
        }
    } catch (error) {
        console.error('Error handling message:', error);
        console.error('Problematic message:', event.data);
    }
}

function formatNumber(num) {
    if (num === undefined || num === null || typeof num !== 'number') {
        return '0.000'.padStart(8, ' ');
    }
    return num.toFixed(3).padStart(8, ' ');
}

function formatGPS(num) {
    if (num === undefined || num === null || typeof num !== 'number') {
        return '0.000000000'.padStart(14, ' ');
    }
    return num.toFixed(9).padStart(14, ' ');
}

function draw() {
    background(0);
    textOverlay.clear();
    textOverlay.textSize(16);
    textOverlay.fill(255);
    
    const columnWidth = width / 5;
    const rowHeight = 30;
    const padding = 10;
    let row = 1;
    let col = 0;

    // Draw headers
    textOverlay.textAlign(LEFT, CENTER);
    textOverlay.textStyle(BOLD);
    textOverlay.text("ZIG SIM PRO AllDataDisplay.js", padding, rowHeight / 2);
    textOverlay.textStyle(NORMAL);
    
    row++;

    // Display 3D vector data (accel, gravity, gyro)
    const vectorSensors = ['accel', 'gravity', 'gyro'];
    vectorSensors.forEach(sensor => {
        col = 0;
        const data = sensorData[sensor] || {x: 0, y: 0, z: 0};
        textOverlay.fill(200);
        textOverlay.text(sensor, col * columnWidth + padding, row * rowHeight);
        textOverlay.fill(255);
        textOverlay.text(`x: ${formatNumber(data.x)}`, (col + 1) * columnWidth + padding, row * rowHeight);
        textOverlay.text(`y: ${formatNumber(data.y)}`, (col + 2) * columnWidth + padding, row * rowHeight);
        textOverlay.text(`z: ${formatNumber(data.z)}`, (col + 3) * columnWidth + padding, row * rowHeight);
        row++;
    });

    // Display compass
    col = 0;
    const compass = sensorData.compass || {heading: 0, orientation: 'Portrait'};
    textOverlay.fill(200);
    textOverlay.text('compass', col * columnWidth + padding, row * rowHeight);
    textOverlay.fill(255);
    textOverlay.text(`${formatNumber(compass.heading)}°`, (col + 1) * columnWidth + padding, row * rowHeight);
    textOverlay.text(compass.orientation, (col + 2) * columnWidth + padding, row * rowHeight);
    row++;

    // Display quaternion
    col = 0;
    const quat = sensorData.quaternion || {x: 0, y: 0, z: 0, w: 1};
    textOverlay.fill(200);
    textOverlay.text('quaternion', col * columnWidth + padding, row * rowHeight);
    textOverlay.fill(255);
    textOverlay.text(`x: ${formatNumber(quat.x)}`, (col + 1) * columnWidth + padding, row * rowHeight);
    textOverlay.text(`y: ${formatNumber(quat.y)}`, (col + 2) * columnWidth + padding, row * rowHeight);
    textOverlay.text(`z: ${formatNumber(quat.z)}`, (col + 3) * columnWidth + padding, row * rowHeight);
    textOverlay.text(`w: ${formatNumber(quat.w)}`, (col + 4) * columnWidth + padding, row * rowHeight);
    row++;

    // Display GPS with more precision
    col = 0;
    const gps = sensorData.gps || {lat: 0, lon: 0, alt: 0};
    textOverlay.fill(200);
    textOverlay.text('gps', col * columnWidth + padding, row * rowHeight);
    textOverlay.fill(255);
    textOverlay.text(`lat: ${formatGPS(gps.lat)}`, (col + 1) * columnWidth + padding, row * rowHeight);
    textOverlay.text(`lon: ${formatGPS(gps.lon)}`, (col + 2) * columnWidth + padding, row * rowHeight);
    textOverlay.text(`alt: ${formatGPS(gps.alt)}`, (col + 3) * columnWidth + padding, row * rowHeight);
    row++;

    // Display mic level (single column)
    col = 0;
    textOverlay.fill(200);
    textOverlay.text('mic level', col * columnWidth + padding, row * rowHeight);
    textOverlay.fill(255);
    textOverlay.text(formatNumber(sensorData.micLevel), (col + 1) * columnWidth + padding, row * rowHeight);
    row++;
    
    // Display battery level (single column)
    col = 0;
    textOverlay.fill(200);
    textOverlay.text('battery', col * columnWidth + padding, row * rowHeight);
    textOverlay.fill(255);
    textOverlay.text(formatNumber(sensorData.battery), (col + 1) * columnWidth + padding, row * rowHeight);
    row++;

    // Display active touches last
    if (Array.isArray(sensorData.touches)) {
        sensorData.touches.forEach((touch, index) => {
            if (touch && (touch.x !== 0 || touch.y !== 0 || touch.radius !== 0 || touch.force !== 0)) {
                col = 0;
                textOverlay.fill(200);
                textOverlay.text(`touch ${index}`, col * columnWidth + padding, row * rowHeight);
                textOverlay.fill(255);
                textOverlay.text(`x: ${formatNumber(touch.x)}`, (col + 1) * columnWidth + padding, row * rowHeight);
                textOverlay.text(`y: ${formatNumber(touch.y)}`, (col + 2) * columnWidth + padding, row * rowHeight);
                textOverlay.text(`r: ${formatNumber(touch.radius)}`, (col + 3) * columnWidth + padding, row * rowHeight);
                textOverlay.text(`f: ${formatNumber(touch.force)}`, (col + 4) * columnWidth + padding, row * rowHeight);
                row++;
            }
        });
    }

    image(textOverlay, 0, 0);
}