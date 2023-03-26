import { io } from 'socket.io-client';

const isProduction = process.env.NODE_ENV === 'production';
const socketUrl = isProduction ?
    process.env.REACT_APP_BASE_API_URL_PROD :
    process.env.REACT_APP_BASE_API_URL_DEV;

export const socket = io(socketUrl, {
    transports: [
        'websocket',
        'polling',
    ],
    secure: isProduction,
    rejectUnauthorized: false,
});
