import { io } from 'socket.io-client';

const socketUrl = process.env.REACT_APP_API_BASE_URL;

export const socket = io(socketUrl, {
    transports: [
        'websocket',
        'polling'
    ],
});
