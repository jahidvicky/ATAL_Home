import { io } from "socket.io-client";
import { SOCKET_URL } from "./Api";

const socket = io(SOCKET_URL, {
    path: "/socket.io/",
    transports: ["websocket"],
});

export default socket;
