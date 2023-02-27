import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_SOCKET}`, {
  reconnection : true,
  reconnectionDelayMax: 2000,
  path : "/new-socket/",
  transports: ['websocket'],
  upgrade: false,
});


// socket.on("connect_error", (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });


export {socket}      