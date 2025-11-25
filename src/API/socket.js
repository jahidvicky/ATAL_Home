import { io } from "socket.io-client";
import { SOCKET_URL } from "./Api";

const socket = io("wss://ataloptical.org", {
    path: "/socket.io/",
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
});

export default socket;
