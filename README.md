# parcel

Minimal live collaborative code editor scaffold.

## Stack

- Frontend: React + CodeMirror 6 + Tailwind
- Backend: Node.js + Express + WebSockets
- Sync: Yjs + y-websocket

## Structure

- `client/` React app with a single collaborative `Editor` component
- `server/` Express app with `/health` and a y-websocket server on the same port

## Install

```bash
npm install
npm install --prefix client
npm install --prefix server
```

## Run

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:1234/health`

## Rooms

Each URL path is a separate room:

- `http://localhost:5173/` -> `default-room`
- `http://localhost:5173/interview-prep` -> `interview-prep`
- `http://localhost:5173/team-a` -> `team-a`

Open the same path in multiple tabs to collaborate in one session.

## Collaborate With A Friend (LAN)

1. Ensure both of you are on the same network.
2. Start both servers on your machine:

```bash
npm run dev
```

3. Find your local IPv4 address:

```powershell
ipconfig
```

4. Share this URL with your friend (same room path):

```text
http://YOUR_LOCAL_IP:5173/team-room
```

Example: `http://192.168.1.20:5173/team-room`

Notes:
- Keep both `client` and `server` running via `npm run dev`.
- Collaboration websocket traffic is proxied through port `5173`, so your friend only needs the shared frontend URL.
