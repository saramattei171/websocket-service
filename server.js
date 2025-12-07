import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const PORT = process.env.PORT || 10000;


app.use(express.json());


const wss = new WebSocketServer({ noServer: true });
let clients = [];


app.get("/", (req, res) => {
  res.send("WebSocket server ON");
});

app.post("/command", (req, res) => {
    const command = req.body;

    console.log("Comando ricevuto da N8N:", command);

    
    clients.forEach(ws => ws.send(JSON.stringify(command)));

    res.json({ status: "inviato", command });
});

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






