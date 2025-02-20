    let sensorData = {
        qrCode: {
            message: '',
            version: 0,
            maskPattern: 0,
            errorCorrectionLevel: '',
            corners: {
                topLeft: { x: 0, y: 0 },
                topRight: { x: 0, y: 0 },
                bottomLeft: { x: 0, y: 0 },
                bottomRight: { x: 0, y: 0 }
            }
        },
        device: {
            model: '',
            name: '',
            os: '',
            version: '',
            width: 0,
            height: 0
        }
    };

    let socket;
    let textOverlay;
    let canvas;

    function setup() {
        canvas = createCanvas(windowWidth, windowHeight);
        textOverlay = createGraphics(windowWidth, windowHeight);
        connectWebSocket();
    }

    function connectWebSocket() {
        socket = new WebSocket('ws://localhost:8081');
        
        socket.onopen = function(event) {
            console.log('WebSocket connected');
        };

        socket.onmessage = handleMessage;

        socket.onerror = function(error) {
            console.error('WebSocket error:', error);
        };

        socket.onclose = function(event) {
            console.log('WebSocket closed');
            setTimeout(connectWebSocket, 5000);
        };
    }

    function handleMessage(event) {
        try {
            let msg = JSON.parse(event.data);
            let address = msg.address;
            let type = address.split('/').pop().toLowerCase();
            
            const args = Array.isArray(msg.args) ? msg.args : [];
            const value = args[0];

            switch(type) {
                case 'deviceinfo':
                    sensorData.device = {
                        model: args[0] || '',
                        name: args[1] || '',
                        os: args[2] || '',
                        version: args[3] || '',
                        width: args[4] || 0,
                        height: args[5] || 0
                    };
                    break;
                case 'qrmessage0':
                    sensorData.qrCode.message = value || '';
                    break;
                case 'qrversion0':
                    sensorData.qrCode.version = value || 0;
                    break;
                case 'qrmaskpattern0':
                    sensorData.qrCode.maskPattern = value || 0;
                    break;
                case 'qrerrorcorrectionlevel0':
                    sensorData.qrCode.errorCorrectionLevel = value || '';
                    break;
                case 'topleft01':
                    sensorData.qrCode.corners.topLeft.x = value || 0;
                    break;
                case 'topleft02':
                    sensorData.qrCode.corners.topLeft.y = value || 0;
                    break;
                case 'topright01':
                    sensorData.qrCode.corners.topRight.x = value || 0;
                    break;
                case 'topright02':
                    sensorData.qrCode.corners.topRight.y = value || 0;
                    break;
                case 'bottomleft01':
                    sensorData.qrCode.corners.bottomLeft.x = value || 0;
                    break;
                case 'bottomleft02':
                    sensorData.qrCode.corners.bottomLeft.y = value || 0;
                    break;
                case 'bottomright01':
                    sensorData.qrCode.corners.bottomRight.x = value || 0;
                    break;
                case 'bottomright02':
                    sensorData.qrCode.corners.bottomRight.y = value || 0;
                    break;
            }
        } catch (error) {
            console.error('Error handling message:', error);
        }
    }

    function draw() {
        // Clear backgrounds
        background(0);
        textOverlay.clear();
        
        // Set basic text properties
        textOverlay.textSize(16);
        textOverlay.textAlign(LEFT, TOP);
        
        let y = 20;
        const padding = 20;
        const lineHeight = 24;

        // Draw status section
        textOverlay.noStroke();
        
        // Device Info
        textOverlay.fill(200);
        if (sensorData.device.model) {
            textOverlay.text(`Device: ${sensorData.device.model}`, padding, y);
            y += lineHeight;
            textOverlay.text(`Resolution: ${sensorData.device.width} × ${sensorData.device.height}`, 
                padding, y);
            y += lineHeight * 1.5;
        }

        // QR Code Info
        if (sensorData.qrCode.message) {
            // Status indicator
            textOverlay.fill(0, 255, 0);
            textOverlay.text('QR Code Detected', padding, y);
            y += lineHeight * 1.5;
            
            // QR Message
            textOverlay.fill(255);
            textOverlay.text('Content:', padding, y);
            y += lineHeight;
            textOverlay.fill(200);
            textOverlay.text(sensorData.qrCode.message, padding + 20, y);
            y += lineHeight * 1.5;

            // Technical Details
            textOverlay.fill(255);
            textOverlay.text('Technical Details:', padding, y);
            y += lineHeight;
            textOverlay.fill(200);
            textOverlay.text(`Version: ${sensorData.qrCode.version}`, padding + 20, y);
            y += lineHeight;
            textOverlay.text(`Error Correction: ${sensorData.qrCode.errorCorrectionLevel}`, 
                padding + 20, y);
            y += lineHeight;
            textOverlay.text(`Mask Pattern: ${sensorData.qrCode.maskPattern}`, 
                padding + 20, y);
            y += lineHeight * 1.5;

            // Draw QR code visualization
            const corners = sensorData.qrCode.corners;
            
            // Calculate center point of QR code in device coordinates
            const centerX = (corners.topLeft.x + corners.topRight.x + corners.bottomLeft.x + corners.bottomRight.x) / 4;
            const centerY = (corners.topLeft.y + corners.topRight.y + corners.bottomLeft.y + corners.bottomRight.y) / 4;
            
            // Calculate uniform scale factor to maintain square aspect ratio
            const deviceScale = Math.min(width / sensorData.device.width, height / sensorData.device.height);
            
            // Function to transform coordinates while maintaining aspect ratio
            const transformPoint = (x, y) => {
                // Convert to relative coordinates from center
                const relX = x - centerX;
                const relY = y - centerY;
                
                // Scale uniformly
                const scaledX = relX * deviceScale;
                const scaledY = relY * deviceScale;
                
                // Center in canvas
                return {
                    x: (width / 2) + scaledX,
                    y: (height / 2) + scaledY
                };
            };

            // Draw boundary
            textOverlay.stroke(0, 255, 0);
            textOverlay.strokeWeight(2);
            textOverlay.noFill();
            textOverlay.beginShape();
            
            // Transform each corner point
            const tTopLeft = transformPoint(corners.topLeft.x, corners.topLeft.y);
            const tTopRight = transformPoint(corners.topRight.x, corners.topRight.y);
            const tBottomRight = transformPoint(corners.bottomRight.x, corners.bottomRight.y);
            const tBottomLeft = transformPoint(corners.bottomLeft.x, corners.bottomLeft.y);
            
            textOverlay.vertex(tTopLeft.x, tTopLeft.y);
            textOverlay.vertex(tTopRight.x, tTopRight.y);
            textOverlay.vertex(tBottomRight.x, tBottomRight.y);
            textOverlay.vertex(tBottomLeft.x, tBottomLeft.y);
            textOverlay.endShape(CLOSE);

            // Draw corner markers
            textOverlay.fill(255, 0, 0);
            textOverlay.noStroke();
            const pointSize = 6;
            
            // Use transformed points for markers
            [tTopLeft, tTopRight, tBottomRight, tBottomLeft].forEach(point => {
                textOverlay.ellipse(point.x, point.y, pointSize, pointSize);
            });
        } else {
            textOverlay.fill(255, 0, 0);
            textOverlay.text('No QR Code Detected', padding, y);
        }

        // Display the overlay
        image(textOverlay, 0, 0);
    }

    function windowResized() {
        resizeCanvas(windowWidth, windowHeight);
        textOverlay = createGraphics(windowWidth, windowHeight);
    }