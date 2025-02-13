let sensorData = {
    arkit: {
        deviceInfo: {},
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0, w: 1},
        featurePoints: []  // Will store array of {x,y,z} objects
    }
};

let socket;
let textOverlay;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textOverlay = createGraphics(windowWidth, windowHeight);
    connectWebSocket();
}

function connectWebSocket() {
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
        let type = address.split('/').pop().toLowerCase();
        console.log('Message type:', type, 'Address:', address);
        
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
                // Debug logging
                console.log('Received feature points:', args);
                
                // Convert flat array into array of 3D points
                const points = [];
                if (args && args.length > 0) {
                    // Get the array of points, whether it's directly in args or in args[0]
                    const pointsArray = Array.isArray(args[0]) ? args[0] : args;
                    
                    for (let i = 0; i < pointsArray.length; i += 3) {
                        points.push({
                            x: pointsArray[i],
                            y: pointsArray[i + 1],
                            z: pointsArray[i + 2]
                        });
                    }
                    console.log('Processed points:', points.length);
                }
                sensorData.arkit.featurePoints = points;
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

    // Title
    textOverlay.textStyle(BOLD);
    textOverlay.text("AR Kit Data Display", padding, row * rowHeight);
    textOverlay.textStyle(NORMAL);
    row += 2;

    // Device Info
    col = 0;
    textOverlay.fill(200);
    textOverlay.text('Device Info:', col * columnWidth + padding, row * rowHeight);
    textOverlay.fill(255);
    textOverlay.text(JSON.stringify(sensorData.arkit.deviceInfo), (col + 1) * columnWidth + padding, row * rowHeight);
    row++;

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

    // Feature Points
    row++;
    textOverlay.fill(200);
    textOverlay.text('Feature Points:', padding, row * rowHeight);
    textOverlay.fill(255);
    textOverlay.text(`Count: ${sensorData.arkit.featurePoints.length}`, (col + 1) * columnWidth + padding, row * rowHeight);
    row++;

    // Display first 5 feature points as example
    const pointsToShow = Math.min(5, sensorData.arkit.featurePoints.length);
    for (let i = 0; i < pointsToShow; i++) {
        const point = sensorData.arkit.featurePoints[i];
        textOverlay.text(
            `Point ${i}: x: ${formatNumber(point.x)} y: ${formatNumber(point.y)} z: ${formatNumber(point.z)}`,
            padding + 20,
            row * rowHeight
        );
        row++;
    }

    image(textOverlay, 0, 0);
}