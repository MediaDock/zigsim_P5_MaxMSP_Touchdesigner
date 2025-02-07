let sensorData = {
    accel: {x: 0, y: 0, z: 0},
    gravity: {x: 0, y: 0, z: 0},
    gyro: {x: 0, y: 0, z: 0},
    quaternion: {x: 0, y: 0, z: 0, w: 1},
    compass: {x: 0, y: 0, z: 0},
    pressure: 0,
    gps: {lat: 0, lon: 0, alt: 0},
    touch: {x: 0, y: 0},
    beacon: {uuid: '', major: 0, minor: 0, rssi: 0},
    proximity: 0,
    micLevel: 0,
    remoteControl: {button: 0},
    battery: 0
};

function setup() {
    createCanvas(windowWidth, windowHeight);
    textOverlay = createGraphics(windowWidth, windowHeight);
    
    socket = new WebSocket('ws://localhost:8081');
    socket.onmessage = handleMessage;
}

function handleMessage(event) {
    let msg = JSON.parse(event.data);
    let type = msg.address.split('/').pop();
    
    switch(type) {
        case 'accel':
            sensorData.accel = {x: msg.args[0], y: msg.args[1], z: msg.args[2]};
            break;
        case 'gravity':
            sensorData.gravity = {x: msg.args[0], y: msg.args[1], z: msg.args[2]};
            break;
        case 'quaternion':
            sensorData.gyro = {x: msg.args[0], y: msg.args[1], z: msg.args[2], w: msg.args[3]};
            break;
        case 'compass':
            sensorData.compass = {x: msg.args[0], y: msg.args[1], z: msg.args[2]};
            break;
        case 'pressure':
            sensorData.pressure = msg.args[0];
            break;
        case 'gps':
            sensorData.gps = {lat: msg.args[0], lon: msg.args[1], alt: msg.args[2]};
            break;
        case 'touch':
            sensorData.touch = {x: msg.args[0], y: msg.args[1]};
            break;
        case 'beacon':
            sensorData.beacon = {uuid: msg.args[0], major: msg.args[1], minor: msg.args[2], rssi: msg.args[3]};
            break;
        case 'proximity':
            sensorData.proximity = msg.args[0];
            break;
        case 'miclevel':
            sensorData.micLevel = msg.args[1];
            break;
        case 'remotecontrol':
            sensorData.remoteControl.button = msg.args[0];
            break;
        case 'battery':
            sensorData.battery = msg.args[0];
            break;
    }
}

function draw() {
    background(0);
    textOverlay.clear();
    textOverlay.textSize(16);
    textOverlay.fill(255);
    
    // Table headers
    let col1 = 20;
    let col2 = 150;
    let rowHeight = 25;
    let y = 30;
 
    // Draw table lines
    textOverlay.stroke(100);
    textOverlay.line(col1, 10, width-20, 10);
    textOverlay.line(col1, y+5, width-20, y+5);
 
    // Headers
    textOverlay.noStroke();
    textOverlay.text("Sensor", col1, y);
    textOverlay.text("Value", col2, y);
 
    y += rowHeight;
 
    // Format values with fixed decimal places
    Object.entries(sensorData).forEach(([sensor, value]) => {
        let formattedValue = "";
        if (typeof value === 'object') {
            formattedValue = Object.entries(value)
                .map(([k, v]) => `${k}: ${v.toFixed(3)}`)
                .join(', ');
        } else {
            formattedValue = value.toFixed(3);
        }
        
        // Draw row
        textOverlay.text(sensor, col1, y);
        textOverlay.text(formattedValue, col2, y);
        textOverlay.line(col1, y+5, width-20, y+5);
        y += rowHeight;
    });
 
    image(textOverlay, 0, 0);
 }
