import express from "express";
import { WebSocketServer } from "ws";

const app = express();


const PORT = process.env.PORT ||10000;


app.post("/command", (req, res) => {
  const { action } = req.body;

  if (clientSocket) {
    clientSocket.send(JSON.stringify({ action }));
    console.log("Sent to WebSocket:", action);
  }

  res.json({ status: "OK", action });
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












