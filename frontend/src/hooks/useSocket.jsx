// useSocket.js (Frontend WebSocket Hook)
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the WebSocket Context to share WebSocket state across components
const WebSocketContext = createContext({
    socket: null,
    isConnected: false,
    sendMessage: () => {},
});

// WebSocket server URL (Make sure it matches your backend WebSocket server URL)
const URL = 'ws://localhost:3000'; // Ensure this matches the WebSocket server's port

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    // WebSocket connection logic
    useEffect(() => {
        const ws = new WebSocket(URL);

        ws.onopen = () => {
            console.log('WebSocket connection opened');
            setSocket(ws);
            setIsConnected(true);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            setSocket(null);
            setIsConnected(false);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Cleanup when the component unmounts or WebSocket connection closes
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    // Function to send a message through WebSocket
    const sendMessage = (message) => {
        if (socket && isConnected) {
            socket.send(message);
        } else {
            console.warn('Cannot send message, WebSocket is not connected.');
        }
    };

    return (
        <WebSocketContext.Provider value={{ socket, isConnected, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Custom hook to use the WebSocket context
export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
