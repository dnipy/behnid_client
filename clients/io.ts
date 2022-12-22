import { io } from "socket.io-client";

const socket = io("http://behnid.com", {
  reconnectionDelayMax: 20000,
  // transports: ['websocket'],
  path : "/new-socket"
});


// socket.on("connect_error", (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });




export {socket}   