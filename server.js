// server.js
import express from "express";
import { WebSocketServer } from "ws";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;

// ROUTE ROOT — così non vedrai più "Cannot GET /"
app.get("/", (req, res) => {
  res.send("WebSocket server ON");
});

// Endpoint che N8N può chiamare per inviare comandi ai client WS
app.post("/send", (req, res) => {
  const payload = req.body;
  // invia a tutti i client WS connessi
  wss.clients.forEach((c) => {
    if (c.readyState === 1) c.send(JSON.stringify(payload));
  });
  res.json({ status: "sent", payload });
});

// Avvio server HTTP (Express)
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// WebSocket server collegato al server HTTP
const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  console.log("WS client connected");
  ws.send(JSON.stringify({ info: "connected" }));

  ws.on("message", (msg) => {
    console.log("Received WS message:", msg.toString());
  });

  ws.on("close", () => {
    console.log("WS client disconnected");
  });
});

    });
});



