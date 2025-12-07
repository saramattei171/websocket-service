import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


const wss = new WebSocketServer({ noServer: true });
let clients = [];


wss.on("connection", (ws) => {
    clients.push(ws);
    console.log("Client WebSocket connesso!");

    ws.on("close", () => {
        clients = clients.filter(c => c !== ws);
        console.log("Client disconnesso");
    });
});


app.post("/command", (req, res) => {
    const command = req.body;

    console.log("Comando ricevuto da N8N:", command);

    
    clients.forEach(ws => ws.send(JSON.stringify(command)));

    res.json({ status: "inviato", command });
});


const server = app.listen(PORT, () => {
    console.log("Server attivo sulla porta " + PORT);
});


server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, ws => {
        wss.emit("connection", ws, request);
    });
});


