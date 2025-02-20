let socket;
let addressHandlers = {};
let micLevel = 0;
let euler = { yaw: 0, pitch: 0, roll: 0 };
let pg;


function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pg = createGraphics(width, height, WEBGL);
    pg.setAttributes({ alpha: true });

    // Connect to the WebSocket server
    socket = new WebSocket('ws://localhost:8081');
    socket.onopen = () => console.log("WebSocket connected");
    socket.onerror = (error) => console.log("WebSocket error:", error);
    
    

    // Listen for messages
    socket.onmessage = function (event) {
        let msg = JSON.parse(event.data);
        console.log("Browser received OSC message:", msg);
        handleOSCMessage(msg);
    };

    // Setup handlers for different OSC addresses
    addressHandlers["miclevel"] = handleMicLevel;
    addressHandlers["accel"] = handleAccel;
    addressHandlers["quaternion"] = handleQuaternion;
}

function draw() {
    // trick transparent background with webgl https://editor.p5js.org/micuat/sketches/qOAjrWJf9
    pg.background(0, 20)
    // Use orthogonal projection to avoid perspective distortion (optional)
    pg.ortho(-200, 200, -200, 200, 0.1, 1000);

  
    pg.camera(400, -400, 400,   
         0, 0, 0,     // Look at the origin
         0, 1, 0);    // Y-axis points upwards (keep the camera upright)

   

    //drawAxis()
    pg.stroke(255);
    pg.noFill();

    /*
    p5 Axis
    ~~~
    X-axis: Positive X points to the right. red
    Y-axis: Positive Y points downwards (towards the bottom of the screen). green
    Z-axis: Positive Z points towards the viewer (out of the screen). blue


    iPhone Axis
    ~~~~~
    X-axis: Typically goes across the screen (left to right in landscape mode).
    Y-axis: Typically goes vertically along the screen (up and down in portrait mode).
    Z-axis: Typically goes through the back of the phone (outward from the screen).
    */
   
    pg.push();
    pg.rotateX(TWO_PI-euler.roll);
    pg.rotateY(euler.yaw);
    pg.rotateZ(euler.pitch);

    pg.scale(micLevel*2);

    pg.box(100,5,200)

    pg.pop();

    image(pg, -width/2, -height/2)
}


// General handler for OSC messages
function handleOSCMessage(oscMsg) {
    const { address, args } = oscMsg;
    console.log("Raw OSC:", oscMsg.address, oscMsg.args); // Add this line

    // Extract the last part of the address (e.g., 'miclevel' or 'accel')
    let addressParts = address.split('/');
    let lastPart = addressParts[addressParts.length - 1];

    // Check if there's a specific handler for the last part of the address
    if (addressHandlers[lastPart]) {
        addressHandlers[lastPart](args); // Call the corresponding handler with the arguments
    }
}


// Handler function for microphone level
function handleMicLevel(args) {
    /*
    https://1-10.github.io/zigsim/features/mic-level.html#outputs
    Mic Level command detects sound level around the device and outputs following values:
    max: Peak RMS power of the mic input. Max value is 0.
    average: Average RMS power of the mic input. Max value is 0.
    */
    micLevel = map(args[1], -60, 0, 0, 1);  // its the average value we are interested in

}

// Handler function for accelerometer data
function handleAccel(args) {
    /*
    Acceleration command detects acceleration that the user is giving to the device.
    Values are in G's (gravitational force) for X, Y and Z axis.
    Values are in the order of x, y, z.

    */
    let accelX = args[0];
    let accelY = args[1];
    let accelZ = args[2];
    console.log("Accelerometer X:", accelX, "Y:", accelY, "Z:", accelZ);
    // Do something with the accelerometer data
}


function handleQuaternion(args) {
    /*
    Quaternion command detects the orientation of the device.
    zig sym Values are in the order of x, y, z, w !!
    */
    let quatX = args[0];
    let quatY = args[1];
    let quatZ = args[2];
    let quatW = args[3];
    quaternion = { w: quatW, x: quatX, y: quatY, z: quatZ };
    //console.log("Quaternion X:", quatX, "Y:", quatY, "Z:", quatZ, "W:", quatW);
    quaternionToEuler({ 'w': quatW, 'x': quatX, 'y': quatY, 'z': quatZ });
   
}

function quaternionToEuler(q) {

    // Yaw (rotation around iphone z-axis)
    euler.yaw = Math.atan2(2.0 * (q.w * q.z + q.x * q.y), 1.0 - 2.0 * (q.y * q.y + q.z * q.z));

    // Pitch (rotation around iphone y-axis)
    euler.pitch = Math.asin(2.0 * (q.w * q.y - q.z * q.x));

    // Roll (rotation around iphone x-axis)
    euler.roll = Math.atan2(2.0 * (q.w * q.x + q.y * q.z), 1.0 - 2.0 * (q.x * q.x + q.y * q.y));


}





function drawAxis() {
    // X-axis (Red)
    stroke(255, 0, 0);
    line(0, 0, 0, 200, 0, 0);  // X axis points right

    // Y-axis (Green)
    stroke(0, 255, 0);
    line(0, 0, 0, 0, -200, 0);  // Y axis points upwards

    // Z-axis (Blue)
    stroke(0, 0, 255);
    line(0, 0, 0, 0, 0, 200);  // Z axis points towards the viewer
}