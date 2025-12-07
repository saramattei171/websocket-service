import express from "express";
import { WebSocketServer } from "ws";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("WebSocket server ON");
});

app.post("/send", (req, res) => {
  const payload = req.body;
  // invia a tutti i client WS connessi
  wss.clients.forEach((c) => {
    if (c.readyState === 1) c.send(JSON.stringify(payload));
  });
  res.json({ status: "sent", payload });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
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

    });
});




