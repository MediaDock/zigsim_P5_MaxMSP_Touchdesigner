let faceData = {
    arkit: {
        face: {
            // Face feature positions
            facePosition: { x: 0, y: 0, z: 0 },
            leftEyePosition: { x: 0, y: 0, z: 0 },
            rightEyePosition: { x: 0, y: 0, z: 0 },
            lookAtPosition: { x: 0, y: 0, z: 0 },
            
            // Head orientation
            pitch: 0,
            roll: 0,
            yaw: 0
        }
    }
};

let socket;
let textOverlay;
let canvas2D;
let canvas3D;

function setup() {
    // Create main canvas for data display
    canvas2D = createCanvas(windowWidth, windowHeight);
    canvas2D.position(0, 0);
    textOverlay = createGraphics(windowWidth, windowHeight);
    textOverlay.textFont('monospace');
    

    let container = createElement('div');
    container.position(windowWidth/4, windowHeight/4);
    
    // Create 3D canvas as a separate P5 instance
    canvas3D = new p5(function(p) {
        p.setup = function() {
            let canvas = p.createCanvas(windowWidth/2, windowHeight/2, WEBGL);
            canvas.parent(container);
            // Set camera position - adjust the last number (200) to change distance
            // Parameters are: x, y, z (camera position)
            p.camera(0, 0, 200); // Lower number = closer, higher number = further
        };
        
        p.draw = function() {
            p.background(0);
            p.lights();
            p.orbitControl();
            
            // Apply head rotation (inverted pitch and roll)
            p.rotateX(-faceData.arkit.face.pitch);
            p.rotateY(faceData.arkit.face.yaw);
            p.rotateZ(-faceData.arkit.face.roll);
            
            // Draw head orientation axes
            p.strokeWeight(3);
            
            // Forward direction - Red
            p.stroke(255, 0, 0);
            p.line(0, 0, 0, 80, 0, 0);
            
            // Up direction - Green
            p.stroke(0, 255, 0);
            p.line(0, 0, 0, 0, -80, 0);
            
            // Right direction - Blue
            p.stroke(0, 0, 255);
            p.line(0, 0, 0, 0, 0, 80);
            
            // Draw look-at direction arrow
            p.push();
            // Position arrow between the eyes
            const centerX = (faceData.arkit.face.leftEyePosition.x + faceData.arkit.face.rightEyePosition.x) / 2;
            const centerY = (faceData.arkit.face.leftEyePosition.y + faceData.arkit.face.rightEyePosition.y) / 2;
            const centerZ = (faceData.arkit.face.leftEyePosition.z + faceData.arkit.face.rightEyePosition.z) / 2;
            
            p.translate(
                centerX * 100,
                -centerY * 100,
                centerZ * 100
            );
            
            // Draw look-at line
            p.stroke(255, 255, 0); // Yellow color for look-at line
            p.strokeWeight(2);
            p.line(0, 0, 0, 
                  faceData.arkit.face.lookAtPosition.x * 100,
                  -faceData.arkit.face.lookAtPosition.y * 100,
                  faceData.arkit.face.lookAtPosition.z * 100);
            
            p.pop();
            
            // Draw position markers
            p.noStroke();
            
            // Face position
            p.push();
            p.translate(
                faceData.arkit.face.facePosition.x * 100,
                -faceData.arkit.face.facePosition.y * 100,
                faceData.arkit.face.facePosition.z * 100
            );
            p.fill(0, 255, 0);
            p.sphere(5);
            p.pop();
            
            // Left eye position with blink color
            p.push();
            p.translate(
                faceData.arkit.face.leftEyePosition.x * 100,
                -faceData.arkit.face.leftEyePosition.y * 100,
                faceData.arkit.face.leftEyePosition.z * 100
            );
            // Change color based on blink value (green to red)
            const leftBlinkValue = faceData.arkit.face.eyeBlinkLeft || 0;
            // Use a threshold to make the color change more noticeable
            const normalizedLeftBlink = Math.min(leftBlinkValue * 2, 1); // Amplify the effect
            p.fill(
                255 * normalizedLeftBlink,  // Red increases with blink
                255 * (1 - normalizedLeftBlink),  // Green decreases with blink
                0  // No blue
            );
            p.sphere(3);
            p.pop();
            
            // Right eye position with blink color
            p.push();
            p.translate(
                faceData.arkit.face.rightEyePosition.x * 100,
                -faceData.arkit.face.rightEyePosition.y * 100,
                faceData.arkit.face.rightEyePosition.z * 100
            );
            // Change color based on blink value (green to red)
            const rightBlinkValue = faceData.arkit.face.eyeBlinkRight || 0;
            // Use a threshold to make the color change more noticeable
            const normalizedRightBlink = Math.min(rightBlinkValue * 2, 1); // Amplify the effect
            p.fill(
                255 * normalizedRightBlink,  // Red increases with blink
                255 * (1 - normalizedRightBlink),  // Green decreases with blink
                0  // No blue
            );
            p.sphere(3);
            p.pop();
        };

        p.windowResized = function() {
            p.resizeCanvas(windowWidth/2, windowHeight/2);
        };
    });
    
    connectWebSocket();
}

function draw() {
    // Draw data display
    background(0);
    textOverlay.clear();
    textOverlay.textSize(16);
    textOverlay.fill(255);
    
    const columnWidth = width / 3;
    const rowHeight = 20;
    const padding = 10;
    
    // Title
    textOverlay.textStyle(BOLD);
    textOverlay.text("AR Kit Eye and Head Orientation Data", padding, rowHeight);
    textOverlay.textStyle(NORMAL);
    
    // Draw data layout
    const displayLayout = [
        {
            title: "Head Orientation",
            data: ['pitch', 'yaw', 'roll']
        },
        {
            title: "Look At Position",
            data: ['lookAtPosition.x', 'lookAtPosition.y', 'lookAtPosition.z']
        },
        {
            title: "Eye Blink",
            data: ['eyeBlinkLeft', 'eyeBlinkRight']
        }
    ];

    let currentRow = 3;
    displayLayout.forEach(group => {
        // Draw group title
        textOverlay.textStyle(BOLD);
        textOverlay.text(group.title, padding, currentRow * rowHeight);
        textOverlay.textStyle(NORMAL);
        currentRow++;
        
        // Draw group data
        group.data.forEach(item => {
            let value;
            if (item.includes('.')) {
                const [obj, prop] = item.split('.');
                value = faceData.arkit.face[obj] ? faceData.arkit.face[obj][prop] : 0;
            } else {
                value = faceData.arkit.face[item];
            }
            
            const y = currentRow * rowHeight;
            textOverlay.text(`${item}: ${formatValue(value)}`, padding, y);
            currentRow++;
        });
        currentRow++;
    });
    
    image(textOverlay, 0, 0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    textOverlay = createGraphics(windowWidth, windowHeight);
    textOverlay.textFont('monospace');
    
    // Update container position
    let container = canvas3D.canvas.parent();
    container.position(windowWidth/4, windowHeight/4);
}

function formatValue(value) {
    if (value === undefined || value === null || typeof value !== 'number') {
        return '0.000';
    }
    return value.toFixed(3);
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
        const args = Array.isArray(msg.args) ? msg.args : [];
        
        // Handle blink messages
        if (type === 'faceeyeblinkleft') {
            faceData.arkit.face.eyeBlinkLeft = args[0] || 0;
            console.log('Left eye blink value:', faceData.arkit.face.eyeBlinkLeft);
        }
        else if (type === 'faceeyeblinkright') {
            faceData.arkit.face.eyeBlinkRight = args[0] || 0;
            console.log('Right eye blink value:', faceData.arkit.face.eyeBlinkRight);
        }
        
        // Handle position and rotation messages
        if (type === 'facerotation' || type === 'faceposition' || 
            type === 'facelefteyeposition' || type === 'facerighteyeposition' || 
            type === 'facelookatposition') {
            if (args.length >= 3) {
                const values = {
                    x: args[0] || 0,
                    y: args[1] || 0,
                    z: args[2] || 0
                };
                
                switch(type) {
                    case 'facerotation':
                        faceData.arkit.face.pitch = values.x;
                        faceData.arkit.face.yaw = values.y;
                        faceData.arkit.face.roll = values.z;
                        break;
                    case 'faceposition':
                        faceData.arkit.face.facePosition = values;
                        break;
                    case 'facelefteyeposition':
                        faceData.arkit.face.leftEyePosition = values;
                        break;
                    case 'facerighteyeposition':
                        faceData.arkit.face.rightEyePosition = values;
                        break;
                    case 'facelookatposition':
                        faceData.arkit.face.lookAtPosition = values;
                        break;
                }
            }
        }
    } catch (error) {
        console.error('Error handling message:', error);
        console.error('Problematic message:', event.data);
    }
}