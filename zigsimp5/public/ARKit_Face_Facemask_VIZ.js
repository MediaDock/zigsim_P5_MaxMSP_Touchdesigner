function drawSimpleEyes() {
    // Get blink values
    const leftBlink = faceData.arkit.face.eyeBlinkLeft;
    const rightBlink = faceData.arkit.face.eyeBlinkRight;
    
    // Set drawing style
    faceCanvas.stroke(255);
    faceCanvas.strokeWeight(2);
    
    // Draw left eye
    faceCanvas.push();
    faceCanvas.translate(-70, -40);
    drawEye(leftBlink);
    faceCanvas.pop();
    
    // Draw right eye
    faceCanvas.push();
    faceCanvas.translate(70, -40);
    drawEye(rightBlink);
    faceCanvas.pop();
}

function drawEye(blinkAmount) {
    // Map the blink amount (0-1) to eye openness
    // When blinkAmount is 1, eye is fully closed
    const eyeHeight = 30 * (1 - blinkAmount);
    
    if (eyeHeight < 2) {
        // Eye is closed - draw a line
        faceCanvas.line(-15, 0, 15, 0);
    } else {
        // Eye is open - draw an ellipse
        faceCanvas.noFill();
        faceCanvas.ellipse(0, 0, 30, eyeHeight);
    }
}let faceData = {
    arkit: {
        face: {
            // Head orientation
            pitch: 0,
            roll: 0,
            yaw: 0,
            
            // Basic expressions
            jawOpen: 0,
            mouthSmileLeft: 0,
            mouthSmileRight: 0,
            mouthFrownLeft: 0,
            mouthFrownRight: 0,
            browInnerUp: 0,
            browDownLeft: 0,
            browDownRight: 0,
            
            // Eye blinking
            eyeBlinkLeft: 0,
            eyeBlinkRight: 0
        }
    }
};

let socket;
let socketStatus = 'Disconnected';
let socketStatusColor;
let faceCanvas;
let infoPanel;

function setup() {
    createCanvas(windowWidth, windowHeight);
    faceCanvas = createGraphics(windowWidth, windowHeight);
    infoPanel = createGraphics(300, 120);
    
    socketStatusColor = color(255, 0, 0);
    connectWebSocket();
    
    frameRate(30);
    textFont('Arial');
    
    updateInfoPanel();
}

function draw() {
    background(30);
    
    // Draw face
    drawFace();
    
    // Draw 2D elements 
    image(faceCanvas, 0, 0);
    image(infoPanel, 20, 20);
    
    // Draw socket status
    fill(socketStatusColor);
    textSize(14);
    textAlign(LEFT, CENTER);
    text(`WebSocket: ${socketStatus}`, 20, height - 20);
}

function drawFace() {
    faceCanvas.clear();
    
    // Center position
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Save the current state
    faceCanvas.push();
    faceCanvas.translate(centerX, centerY);
    
    // Apply simple head rotation
    const scaleFactor = 0.5; // Reduce rotation intensity
    faceCanvas.rotate(faceData.arkit.face.roll * PI/6 * scaleFactor);
    
    // Draw face circle (outline only)
    faceCanvas.noFill();
    faceCanvas.stroke(255);
    faceCanvas.strokeWeight(2);
    faceCanvas.ellipse(0, 0, 300, 400);
    
    // Draw simple eyes with blinking
    drawSimpleEyes();
    
    // Draw simple eyebrows
    drawSimpleEyebrows();
    
    // Draw simple nose (just a line)
    drawSimpleNose();
    
    // Draw simple mouth
    drawSimpleMouth();
    
    // Restore original state
    faceCanvas.pop();
}

// No grid function anymore

function drawSimpleEyebrows() {
    // Calculate eyebrow positions based on expressions
    const browLiftLeft = -faceData.arkit.face.browDownLeft * 15 + faceData.arkit.face.browInnerUp * 10;
    const browLiftRight = -faceData.arkit.face.browDownRight * 15 + faceData.arkit.face.browInnerUp * 10;
    
    // Left eyebrow
    faceCanvas.stroke(255);
    faceCanvas.strokeWeight(3);
    faceCanvas.line(-80, -80 + browLiftLeft, -40, -80 + faceData.arkit.face.browInnerUp * 15);
    
    // Right eyebrow
    faceCanvas.line(40, -80 + faceData.arkit.face.browInnerUp * 15, 80, -80 + browLiftRight);
}

function drawSimpleNose() {
    // Simple nose - just a vertical line
    faceCanvas.stroke(255);
    faceCanvas.strokeWeight(2);
    faceCanvas.line(0, -30, 0, 30);
}

function drawSimpleMouth() {
    // Calculate mouth parameters
    const smileAmount = (faceData.arkit.face.mouthSmileLeft + faceData.arkit.face.mouthSmileRight) / 2;
    const frownAmount = (faceData.arkit.face.mouthFrownLeft + faceData.arkit.face.mouthFrownRight) / 2;
    const jawOpenAmount = faceData.arkit.face.jawOpen;
    
    // Fix the inverted mouth animation - negative curveFactor for smile, positive for frown
    const curveFactor = -smileAmount * 50 + frownAmount * 30;
    
    // Mouth width
    const mouthWidth = 100;
    
    faceCanvas.stroke(255);
    faceCanvas.strokeWeight(2);
    faceCanvas.noFill();
    
    // Draw mouth as a single simple line/curve
    if (jawOpenAmount < 0.1) {
        // Mouth closed - just a curved line
        faceCanvas.beginShape();
        for (let i = -mouthWidth/2; i <= mouthWidth/2; i += 5) {
            // Normalized position (-1 to 1)
            const normalizedX = i / (mouthWidth/2);
            // Calculate y position based on curve
            const y = 100 + curveFactor * Math.pow(normalizedX, 2);
            faceCanvas.vertex(i, y);
        }
        faceCanvas.endShape();
    } else {
        // Mouth open - simple oval shape
        const openAmount = 10 + jawOpenAmount * 30;
        faceCanvas.ellipse(0, 100, mouthWidth, openAmount);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    faceCanvas = createGraphics(windowWidth, windowHeight);
    updateInfoPanel();
}

function connectWebSocket() {
    socketStatus = 'Connecting...';
    socketStatusColor = color(255, 255, 0);
    
    socket = new WebSocket('ws://localhost:8081');

    socket.onopen = function(event) {
        socketStatus = 'Connected';
        socketStatusColor = color(0, 255, 0);
        updateInfoPanel();
    };

    socket.onmessage = handleMessage;

    socket.onerror = function(error) {
        console.error('WebSocket error:', error);
        socketStatus = 'Error';
        socketStatusColor = color(255, 0, 0);
        updateInfoPanel();
    };

    socket.onclose = function(event) {
        socketStatus = 'Disconnected';
        socketStatusColor = color(255, 0, 0);
        updateInfoPanel();
        setTimeout(connectWebSocket, 5000);
    };
}

function handleMessage(event) {
    try {
        let msg = JSON.parse(event.data);
        let address = msg.address;
        let type = address.split('/').pop().toLowerCase();
        
        const args = Array.isArray(msg.args) ? msg.args : [];
        
        if (type === 'facerotation') {
            if (args.length >= 3) {
                faceData.arkit.face.pitch = args[0] || 0;
                faceData.arkit.face.yaw = args[1] || 0;
                faceData.arkit.face.roll = args[2] || 0;
            }
            return;
        }
        
        const value = args[0] || 0;
        
        // Only handle the expressions we need for this simplified version
        const expressionMap = {
            'facejawopen': 'jawOpen',
            'facemouthsmileleft': 'mouthSmileLeft',
            'facemouthsmileright': 'mouthSmileRight',
            'facemouthfrownleft': 'mouthFrownLeft',
            'facemouthfrownright': 'mouthFrownRight',
            'facebrowinnerup': 'browInnerUp',
            'facebrowdownleft': 'browDownLeft',
            'facebrowdownright': 'browDownRight',
            'faceeyeblinkleft': 'eyeBlinkLeft',
            'faceeyeblinkright': 'eyeBlinkRight'
        };

        const mappedType = expressionMap[type];
        if (mappedType) {
            faceData.arkit.face[mappedType] = value;
        }
    } catch (error) {
        console.error('Error handling message:', error);
    }
}

function updateInfoPanel() {
    infoPanel.clear();
    infoPanel.fill(0, 0, 0, 200);
    infoPanel.rect(0, 0, 300, 120);
    infoPanel.fill(255);
    infoPanel.textSize(16);
    infoPanel.textAlign(LEFT, TOP);
    infoPanel.text('Simplified Face Visualization', 10, 10);
    infoPanel.textSize(12);
    infoPanel.text('• Minimal face outline', 10, 40);
    infoPanel.text('• Basic head rotation & blinking', 10, 60);
    infoPanel.text('• Simple expressions', 10, 80);
    infoPanel.text(`Socket: ${socketStatus}`, 10, 100);
}