// server.js

const osc = require("osc");
const WebSocket = require("ws");

// Set up WebSocket server
const wss = new WebSocket.Server({ port: 8081 });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

// Set up UDP socket for OSC
const udpPort = new osc.UDPPort({
    localAddress: "172.20.10.2",
    localPort: 50000
});

udpPort.on("message", (oscMsg) => {
    console.log("Server received OSC:", oscMsg);  // Add this
    // Broadcast to WebSocket clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(oscMsg));
            console.log("Sent to WebSocket client");  // Add this
        }
    });
});

udpPort.open();
