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
    qrCode: { message: '' },
    device: { width: 0, height: 0 }
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
        this.isActive = false;
        this.color = color('#0000FF');
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

class ContentVisualizer {
  constructor() {
    this.currentContent = '';
    this.contentType = 'unknown';
    this.colors = {
      url: { getColor: function() { return color(0, 255, 0); } },
      json: { getColor: function() { return color(100, 180, 255); } },
      text: { getColor: function() { return color(255, 100, 200); } },
      contact: { getColor: function() { return color(180, 50, 220); } },
      unknown: { getColor: function() { return color(200, 200, 200); } }
    };
    this.isActive = false;
    this.animationProgress = 0;
    this.radius = 100;
    this.lastUpdateTime = 0;
  }
  
  setContent(content) {
    this.currentContent = content;
    this.contentType = this.detectContentType(content);
    this.isActive = Boolean(content);
    this.animationProgress = 0;
    this.lastUpdateTime = millis();
  }
  
  detectContentType(content) {
    if (!content) return 'unknown';
    
    // Check if URL
    if (/^https?:\/\//i.test(content)) {
      return 'url';
    }
    
    // Check if JSON
    try {
      JSON.parse(content);
      return 'json';
    } catch(e) {}
    
    // Check if vCard contact
    if (/BEGIN:VCARD/i.test(content)) {
      return 'contact';
    }
    
    // Default to text
    return 'text';
  }
  
  update() {
    if (!this.isActive) return;
    
    // Update animation progress
    const currentTime = millis();
    const elapsed = currentTime - this.lastUpdateTime;
    this.lastUpdateTime = currentTime;
    this.animationProgress = min(this.animationProgress + elapsed/2000, 1);
  }
  
  draw(x, y) {
    if (!this.isActive) return;
    
    push();
    translate(x, y);
    
    // Draw visualization container
    noFill();
    const typeColor = this.colors[this.contentType].getColor();
    stroke(typeColor);
    strokeWeight(2);
    circle(0, 0, this.radius * 2 * this.animationProgress);
    
    // Draw multiple expanding rings on new content
    if (this.animationProgress < 1) {
      // First ring
      noFill();
      stroke(typeColor);
      strokeWeight(4 * (1 - this.animationProgress));
      circle(0, 0, this.radius * 2.5 * this.animationProgress);
      
      // Second ring (slightly delayed)
      if (this.animationProgress > 0.2) {
        const secondRingProgress = (this.animationProgress - 0.2) / 0.8;
        noFill();
        stroke(typeColor);
        strokeWeight(3 * (1 - secondRingProgress));
        circle(0, 0, this.radius * 3 * secondRingProgress);
      }
    }
    
    // Draw content information directly below visualization
    this.drawContentInfo(0, this.radius + 30);
    
    pop();
  }
  
  drawContentInfo(x, y) {
    push();
    translate(x, y);
    
    // Background for info area
    const infoWidth = 240;
    const infoHeight = 100;
    const infoX = 0;
    const infoY = 20;
    
    fill(0, 0, 0, 100);
    noStroke();
    rectMode(CENTER);
    rect(infoX, infoY, infoWidth, infoHeight, 10);
    
    // Draw content type header
    const typeColor = this.colors[this.contentType].getColor();
    fill(typeColor);
    textAlign(CENTER);
    textSize(14);
    noStroke();
    text(this.contentType.toUpperCase(), infoX, infoY - 35);
    
    // Get detailed content based on type
    let contentLines = [];
    switch(this.contentType) {
      case 'url':
        try {
          const url = new URL(this.currentContent);
          contentLines = [
            `Protocol: ${url.protocol.replace(':', '')}`,
            `Domain: ${url.hostname}`
          ];
          if (url.pathname && url.pathname !== "/") {
            let path = url.pathname;
            if (path.length > 30) path = path.substring(0, 27) + "...";
            contentLines.push(`Path: ${path}`);
          }
          if (url.search) {
            let query = url.search;
            if (query.length > 30) query = query.substring(0, 27) + "...";
            contentLines.push(`Query: ${query}`);
          }
        } catch(e) {
          contentLines = ["Invalid URL format", this.currentContent.substring(0, 30)];
        }
        break;
        
      case 'json':
        try {
          const json = JSON.parse(this.currentContent);
          const entries = Object.entries(json);
          
          if (entries.length === 0) {
            contentLines = ["Empty JSON object"];
          } else {
            contentLines = entries.slice(0, 5).map(([key, value]) => {
              const valueText = typeof value === 'object' ? 
                '[' + Object.keys(value).length + ' items]' : 
                String(value).slice(0, 20);
              return `${key}: ${valueText}`;
            });
            if (entries.length > 5) {
              contentLines.push(`...and ${entries.length - 5} more fields`);
            }
          }
        } catch(e) {
          contentLines = ["Invalid JSON format", 
            this.currentContent.substring(0, 50) + 
            (this.currentContent.length > 50 ? "..." : "")];
        }
        break;
        
      case 'contact':
        const extractField = (pattern, defaultValue = "") => {
          const match = this.currentContent.match(pattern);
          return match ? match[1] : defaultValue;
        };
        
        const name = extractField(/N:([^;]+);([^\n]+)/, "Unknown");
        const displayName = extractField(/FN:([^\n]+)/, "");
        const phone = extractField(/TEL:([^\n]+)/, "No phone");
        const email = extractField(/EMAIL:([^\n]+)/, "No email");
        const org = extractField(/ORG:([^\n]+)/, "");
        
        contentLines = [
          `Name: ${displayName || name}`,
          `Phone: ${phone}`,
          `Email: ${email}`
        ];
        if (org) {
          contentLines.push(`Organization: ${org}`);
        }
        break;
        
      default:
        const maxChars = 150;
        const displayText = this.currentContent.length > maxChars ? 
          this.currentContent.substring(0, maxChars) + "..." : 
          this.currentContent;
        
        if (displayText.length <= 40) {
          contentLines = [displayText];
        } else {
          const words = displayText.split(' ');
          let currentLine = '';
          words.forEach(word => {
            if ((currentLine + ' ' + word).length <= 40) {
              currentLine += (currentLine ? ' ' : '') + word;
            } else {
              contentLines.push(currentLine);
              currentLine = word;
            }
          });
          if (currentLine) {
            contentLines.push(currentLine);
          }
          if (contentLines.length > 5) {
            contentLines = contentLines.slice(0, 4);
            contentLines.push('...');
          }
        }
    }
    
    // Display content lines
    fill(255);
    textSize(11);
    textAlign(LEFT);
    const maxDisplayLines = 6;
    const startX = infoX - (infoWidth/2) + 20;
    let startY = infoY - 10;
    
    contentLines.slice(0, maxDisplayLines).forEach((line, index) => {
      text(line, startX, startY + (index * 18));
    });
    
    pop();
  }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
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

    // Add visualizer to the visualization node
    dataNodes[2].visualizer = new ContentVisualizer();

    // Create connections between nodes
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
                    
                    dataNodes[2].visualizer.setContent(value);
                    dataNodes[2].isActive = true;
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
        }
    } catch (error) {
        console.error('Error handling message:', error);
    }
}

function draw() {
    background(0); // Black background

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
        node.draw();
        
        // Update and draw visualizer if it exists
        if (node.visualizer) {
            node.visualizer.update();
            node.visualizer.draw(node.pos.x, node.pos.y);
        }
    });

    // Update and draw message particles
    messageParticles = messageParticles.filter(particle => {
        particle.update();
        particle.draw();
        return particle.isAlive;
    });

    // Draw workflow status
    noStroke();
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text("QR Code Detection Workflow", 20, 20);
    
    // Draw legend
    let y = 50;
    [
        ["Input Node (WebSocket)", color('#0000FF')],
        ["Processing Node (QR Data)", color('#0000FF')],
        ["Output Node (Visualization)", color('#0000FF')],
        ["Active Data Flow", color('#00FF00')]
    ].forEach(([label, col]) => {
        fill(col);
        noStroke();
        circle(30, y, 10);
        fill(255);
        noStroke();
        text(label, 50, y - 5);
        y += 25;
    });
    
    // Add content type legend if active
    if (dataNodes[2] && dataNodes[2].visualizer && dataNodes[2].visualizer.isActive) {
        noStroke();
        fill(255);
        text("Content Types:", 20, y + 10);
        y += 30;
        
        Object.entries(dataNodes[2].visualizer.colors).forEach(([type, col]) => {
            if (type !== 'unknown') {
                noStroke();
                fill(col.getColor());
                circle(30, y, 10);
                fill(255);
                noStroke();
                text(type.charAt(0).toUpperCase() + type.slice(1), 50, y - 5);
                y += 25;
            }
        });
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    setupWorkflowNodes();
}