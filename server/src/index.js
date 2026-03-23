// Express + y-websocket server that hosts health checks and collaborative rooms.
const http = require('http');
const express = require('express');
const cors = require('cors');
const { WebSocketServer } = require('ws');
const { setupWSConnection } = require('y-websocket/bin/utils');

const PORT = Number(process.env.PORT || 1234);

const app = express();
app.use(cors());

app.get('/', (_req, res) => {
  res.send('parcel server is running. Use /health for status and connect the client at http://localhost:5173');
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (socket, request) => {
  setupWSConnection(socket, request, {
    gc: true
  });
});

server.listen(PORT, () => {
  console.log(`parcel server listening on http://localhost:${PORT}`);
});
