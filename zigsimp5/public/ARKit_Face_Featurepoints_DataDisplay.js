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
            yaw: 0,
            
            // Eye expressions
            eyeBlinkLeft: 0,
            eyeBlinkRight: 0,
            eyeSquintLeft: 0,
            eyeSquintRight: 0,
            eyeWideLeft: 0,
            eyeWideRight: 0,
            eyeLookUpLeft: 0,
            eyeLookUpRight: 0,
            eyeLookDownLeft: 0,
            eyeLookDownRight: 0,
            eyeLookInLeft: 0,
            eyeLookInRight: 0,
            eyeLookOutLeft: 0,
            eyeLookOutRight: 0,
            
            // Face expressions
            jawOpen: 0,
            mouthClose: 0,
            mouthFunnel: 0,
            mouthPucker: 0,
            mouthLeft: 0,
            mouthRight: 0,
            mouthSmileLeft: 0,
            mouthSmileRight: 0,
            mouthFrownLeft: 0,
            mouthFrownRight: 0,
            mouthDimpleLeft: 0,
            mouthDimpleRight: 0,
            mouthStretchLeft: 0,
            mouthStretchRight: 0,
            mouthRollLower: 0,
            mouthRollUpper: 0,
            mouthShrugLower: 0,
            mouthShrugUpper: 0,
            mouthPressLeft: 0,
            mouthPressRight: 0,
            mouthLowerDownLeft: 0,
            mouthLowerDownRight: 0,
            mouthUpperUpLeft: 0,
            mouthUpperUpRight: 0,
            browDownLeft: 0,
            browDownRight: 0,
            browInnerUp: 0,
            browOuterUpLeft: 0,
            browOuterUpRight: 0,
            cheekPuff: 0,
            cheekSquintLeft: 0,
            cheekSquintRight: 0,
            noseSneerLeft: 0,
            noseSneerRight: 0,
            tongueOut: 0
        }
    }
};

let socket;
let textOverlay;
let canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    textOverlay = createGraphics(windowWidth, windowHeight);
    textOverlay.textFont('monospace');
    connectWebSocket();
}

function draw() {
    background(0);
    textOverlay.clear();
    textOverlay.textSize(16);
    textOverlay.fill(255);
    
    const columnWidth = width / 3;
    const rowHeight = 20;
    const padding = 10;
    
    // Title
    textOverlay.textStyle(BOLD);
    textOverlay.text("AR Kit Face Expression Data", padding, rowHeight);
    textOverlay.textStyle(NORMAL);

    const displayLayout = [
        {
            title: "Left Side",
            items: [
                { 
                    label: "Left Eye",
                    data: [
                        'eyeBlinkLeft', 'eyeSquintLeft', 'eyeWideLeft', 
                        'eyeLookUpLeft', 'eyeLookDownLeft', 'eyeLookInLeft', 'eyeLookOutLeft'
                    ]
                },
                { 
                    label: "Left Brow",
                    data: ['browDownLeft', 'browOuterUpLeft']
                },
                { 
                    label: "Left Cheek",
                    data: ['cheekSquintLeft', 'noseSneerLeft']
                },
                { 
                    label: "Left Mouth",
                    data: [
                        'mouthLeft', 'mouthSmileLeft', 'mouthFrownLeft', 'mouthDimpleLeft',
                        'mouthStretchLeft', 'mouthPressLeft', 'mouthLowerDownLeft', 'mouthUpperUpLeft'
                    ]
                }
            ]
        },
        {
            title: "Center",
            items: [
                { 
                    label: "Head Orientation",
                    data: ['pitch', 'yaw', 'roll']
                },
                { 
                    label: "Center Features",
                    data: [
                        'browInnerUp', 'cheekPuff', 'tongueOut',
                        'jawOpen', 'mouthClose', 'mouthFunnel', 'mouthPucker',
                        'mouthRollLower', 'mouthRollUpper', 'mouthShrugLower', 'mouthShrugUpper'
                    ]
                },
                { 
                    label: "Feature Points",
                    data: [
                        'facePosition.x', 'facePosition.y', 'facePosition.z',
                        'leftEyePosition.x', 'leftEyePosition.y', 'leftEyePosition.z',
                        'rightEyePosition.x', 'rightEyePosition.y', 'rightEyePosition.z',
                        'lookAtPosition.x', 'lookAtPosition.y', 'lookAtPosition.z'
                    ]
                }
            ]
        },
        {
            title: "Right Side",
            items: [
                { 
                    label: "Right Eye",
                    data: [
                        'eyeBlinkRight', 'eyeSquintRight', 'eyeWideRight',
                        'eyeLookUpRight', 'eyeLookDownRight', 'eyeLookInRight', 'eyeLookOutRight'
                    ]
                },
                { 
                    label: "Right Brow",
                    data: ['browDownRight', 'browOuterUpRight']
                },
                { 
                    label: "Right Cheek",
                    data: ['cheekSquintRight', 'noseSneerRight']
                },
                { 
                    label: "Right Mouth",
                    data: [
                        'mouthRight', 'mouthSmileRight', 'mouthFrownRight', 'mouthDimpleRight',
                        'mouthStretchRight', 'mouthPressRight', 'mouthLowerDownRight', 'mouthUpperUpRight'
                    ]
                }
            ]
        }
    ];

    // Draw the layout
    displayLayout.forEach((column, colIndex) => {
        let currentRow = 3;
        const x = colIndex * columnWidth + padding;
        
        // Draw column title
        textOverlay.fill(255);
        textOverlay.textStyle(BOLD);
        textOverlay.text(column.title, x, currentRow * rowHeight);
        currentRow += 2;
        
        column.items.forEach(group => {
            // Draw group label
            textOverlay.textStyle(BOLD);
            textOverlay.text(group.label, x, currentRow * rowHeight);
            textOverlay.textStyle(NORMAL);
            currentRow++;
            
            // Draw group items
            group.data.forEach(item => {
                let value;
                if (item.includes('.')) {
                    const [obj, prop] = item.split('.');
                    value = faceData.arkit.face[obj] ? faceData.arkit.face[obj][prop] : 0;
                } else {
                    value = faceData.arkit.face[item];
                }
                
                const barWidth = 60;
                const y = currentRow * rowHeight;
                
                // Draw label
                const label = item + ':';
                const truncLabel = label.length > 20 ? label.substring(0, 17) + '...' : label;
                textOverlay.text(truncLabel, x, y);
                
                // Draw value with more space (increased from 150 to 200)
                textOverlay.text(formatValue(value), x + 200, y);
                
                // Draw bar with adjusted position (increased from 200 to 250)
                textOverlay.noStroke();
                textOverlay.fill(50);
                textOverlay.rect(x + 250, y - 12, barWidth, 14);
                textOverlay.fill(255);
                textOverlay.rect(x + 250, y - 12, barWidth * value, 14);
                
                currentRow++;
            });
            currentRow += 1;
        });
    });

    image(textOverlay, 0, 0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    textOverlay = createGraphics(windowWidth, windowHeight);
    textOverlay.textFont('monospace');
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
        
        console.log('Received message:', {
            type: type,
            address: address,
            data: msg
        });
        
        const args = Array.isArray(msg.args) ? msg.args : [];
        
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
            return;
        }
        
        const value = args[0] || 0;
        
        const typeMap = {
            'facejawopen': 'jawOpen',
            'facemouthclose': 'mouthClose',
            'facemouthfunnel': 'mouthFunnel',
            'facemouthpucker': 'mouthPucker',
            'facemouthleft': 'mouthLeft',
            'facemouthright': 'mouthRight',
            'facemouthsmileleft': 'mouthSmileLeft',
            'facemouthsmileright': 'mouthSmileRight',
            'facemouthfrownleft': 'mouthFrownLeft',
            'facemouthfrownright': 'mouthFrownRight',
            'facemouthdimpleleft': 'mouthDimpleLeft',
            'facemouthdimpleright': 'mouthDimpleRight',
            'facemouthstretchleft': 'mouthStretchLeft',
            'facemouthstretchright': 'mouthStretchRight',
            'facemouthrolllower': 'mouthRollLower',
            'facemouthrollupper': 'mouthRollUpper',
            'facemouthshruglower': 'mouthShrugLower',
            'facemouthshrugupper': 'mouthShrugUpper',
            'facemouthpressleft': 'mouthPressLeft',
            'facemouthpressright': 'mouthPressRight',
            'facemouthlowerdownleft': 'mouthLowerDownLeft',
            'facemouthlowerdownright': 'mouthLowerDownRight',
            'facemouthupperupleft': 'mouthUpperUpLeft',
            'facemouthupperupright': 'mouthUpperUpRight',
            'facebrowdownleft': 'browDownLeft',
            'facebrowdownright': 'browDownRight',
            'facebrowinnerup': 'browInnerUp',
            'facebrowouterupleft': 'browOuterUpLeft',
            'facebrowouterupright': 'browOuterUpRight',
            'facecheekpuff': 'cheekPuff',
            'facecheeksquintleft': 'cheekSquintLeft',
            'facecheeksquintright': 'cheekSquintRight',
            'facenosesneerleft': 'noseSneerLeft',
            'facenosesneerright': 'noseSneerRight',
            'facetongueout': 'tongueOut',
            'faceeyeblinkleft': 'eyeBlinkLeft',
            'faceeyeblinkright': 'eyeBlinkRight',
            'faceeyesquintleft': 'eyeSquintLeft',
            'faceeyesquintright': 'eyeSquintRight',
            'faceeyewideleft': 'eyeWideLeft',
            'faceeyewideright': 'eyeWideRight',
            'faceeyelookupleft': 'eyeLookUpLeft',
            'faceeyelookupright': 'eyeLookUpRight',
            'faceeyelookdownleft': 'eyeLookDownLeft',
            'faceeyelookdownright': 'eyeLookDownRight',
            'faceeyelookinleft': 'eyeLookInLeft',
            'faceeyelookinright': 'eyeLookInRight',
            'faceeyelookoutleft': 'eyeLookOutLeft',
            'faceeyelookoutright': 'eyeLookOutRight'
        };

        const mappedType = typeMap[type];
        if (mappedType) {
            faceData.arkit.face[mappedType] = value;
        }
    } catch (error) {
        console.error('Error handling message:', error);
        console.error('Problematic message:', event.data);
    }
}