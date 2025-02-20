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
        width: 0,
        height: 0
    }
};

let socket;
let dataNodes = [];
let connections = [];
let messageParticles = [];

class DataNode {
    constructor(x, y, label, value, type) {
        this.pos = createVector(x, y);
        this.label = label;
        this.value = value || '';
        this.type = type;
        this.radius = 40;
        this.pulseRadius = this.radius;
        this.isActive = false;
        this.color = color('#0000FF');
    }

    update() {
        // Node state updates if needed
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);

        // Draw node
        fill(this.color);
        noStroke();
        circle(0, 0, this.radius * 2);

        // Draw label
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text(this.label, 0, 0);

        // Draw value
        if (this.value) {
            fill(255);
            textSize(10);
            text(this.value.toString().slice(0, 15), 0, this.radius + 20);
        }
        pop();
    }
}

class MessageParticle {
    constructor(start, end, data) {
        this.start = start.copy();
        this.end = end.copy();
        this.pos = start.copy();
        this.data = data;
        this.progress = 0;
        this.speed = 0.02;
        this.isAlive = true;
    }

    update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
            this.isAlive = false;
        }
        this.pos = p5.Vector.lerp(this.start, this.end, this.progress);
    }

    draw() {
        push();
        // Draw particle
                    fill('#00FF00');  // Green data points
        noStroke();
        circle(this.pos.x, this.pos.y, 8);

        // Draw data preview
        if (this.data) {
            fill(255);
            textSize(10);
            textAlign(CENTER);
            text(this.data.toString().slice(0, 10), this.pos.x, this.pos.y - 10);
        }
        pop();
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100);
    setupWorkflowNodes();
    connectWebSocket();
}

function setupWorkflowNodes() {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 200;

    // Create main workflow nodes
    dataNodes = [
        new DataNode(centerX - radius, centerY, "WebSocket", "", "input"),
        new DataNode(centerX, centerY - radius, "QR Data", "", "process"),
        new DataNode(centerX + radius, centerY, "Visualization", "", "output"),
        new DataNode(centerX, centerY + radius, "Device Info", "", "info")
    ];

    // Create connections between nodes - only actual data flows
    connections = [
        [0, 1], // WebSocket to QR Data
        [1, 2], // QR Data to Display
        [0, 3]  // WebSocket to Device Info
    ];
}

function connectWebSocket() {
    socket = new WebSocket('ws://localhost:8081');
    socket.onopen = () => {
        console.log('WebSocket connected');
        dataNodes[0].isActive = true;
    };
    socket.onmessage = handleMessage;
    socket.onerror = error => console.error('WebSocket error:', error);
    socket.onclose = () => {
        dataNodes[0].isActive = false;
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

        // Create message particle from WebSocket to appropriate node
        let targetNodeIndex = type.includes('device') ? 3 : 1;
        messageParticles.push(new MessageParticle(
            dataNodes[0].pos,
            dataNodes[targetNodeIndex].pos,
            value
        ));

        switch(type) {
            case 'qrmessage0':
                sensorData.qrCode.message = value || '';
                dataNodes[1].value = value;
                dataNodes[1].isActive = Boolean(value);
                if (value) {
                    messageParticles.push(new MessageParticle(
                        dataNodes[1].pos,
                        dataNodes[2].pos,
                        value
                    ));
                }
                break;
            case 'deviceinfo':
                sensorData.device = {
                    width: args[4] || 0,
                    height: args[5] || 0
                };
                dataNodes[3].value = `${sensorData.device.width}×${sensorData.device.height}`;
                dataNodes[3].isActive = true;
                break;
            // ... handle other message types
        }
    } catch (error) {
        console.error('Error handling message:', error);
    }
}

function draw() {
    background(230, 10, 10);

    // Draw connections
    stroke(200, 30, 30);
    strokeWeight(2);
    connections.forEach(([fromIdx, toIdx]) => {
        let from = dataNodes[fromIdx];
        let to = dataNodes[toIdx];
        line(from.pos.x, from.pos.y, to.pos.x, to.pos.y);
    });

    // Update and draw nodes
    dataNodes.forEach(node => {
        node.update();
        node.draw();
    });

    // Update and draw message particles
    messageParticles = messageParticles.filter(particle => {
        particle.update();
        particle.draw();
        return particle.isAlive;
    });

    // Draw workflow status
    fill(255);  // White text
    textSize(16);
    textAlign(LEFT, TOP);
    text("QR Code Detection Workflow", 20, 20);
    
    // Draw legend
    let y = 50;
    [
        ["Input Node (WebSocket)", color('#0000FF')],
        ["Processing Node (QR Data)", color('#0000FF')],
        ["Output Node (Visualization)", color('#0000FF')],
        ["Active Data Flow", color('#00FF00')]  // Orange particles
    ].forEach(([label, col]) => {
        fill(col);
        circle(30, y, 10);
        fill(255);  // White text
        text(label, 50, y - 5);
        y += 25;
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    setupWorkflowNodes();
}