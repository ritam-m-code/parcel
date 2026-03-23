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