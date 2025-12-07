import express from "express";
import { WebSocketServer } from "ws";

const app = express();


const PORT = process.env.PORT ||10000;


app.get("/", (req, res) => {
  res.send("WebSocket server ON");
});


const server = app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

// WebSocket collegato a Express
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send(JSON.stringify({ info: "connected to WebSocket" }));

  ws.on("message", (msg) => {
    console.log("Received message:", msg.toString());
  });
});


export function sendToAll(data) {
  const message = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
}











