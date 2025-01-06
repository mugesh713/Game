// index.js (Backend WebSocket Server)
import { WebSocketServer } from 'ws';
import mongoose from 'mongoose';
import { RoomManager } from './classes/roomManager.js';

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://mugeshv22cse:mugeshv22cse@cluster0.0xbsx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = 3000;

// Connect to MongoDB
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Create WebSocket server
const wss = new WebSocketServer({ port: PORT });

// Instantiate the room manager (assuming it's a class managing the game rooms)
const roomManager = new RoomManager();

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('New connection established');

    // Handle incoming messages from clients
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        switch (data.type) {
            case 'create_room':
                roomManager.createRoom(ws, data.usersName);
                break;
            case 'join_room':
                roomManager.joinRoom(data.roomId, ws, data.usersName);
                break;
            case 'start_game':
                roomManager.startGame(data.roomId, ws);
                break;
            case 'click_cell':
                roomManager.clickCell(data.roomId, ws, data.row, data.col);
                break;
            case 'close_room':
                roomManager.closeRoom(data.roomId);
                break;
            default:
                console.log('Unknown message type');
        }
    });

    // Handle WebSocket disconnections
    ws.on('close', () => {
        roomManager.handleDisconnect(ws);
    });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
