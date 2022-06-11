import { Socket } from "socket.io";
import WebSocket from "ws";
import { ENDPOINT, MESSAGE } from "../constants/configs";

export default class ClientSocket {

  constructor() {}

  runSocket(socket: Socket) {
    const connection = new WebSocket(ENDPOINT);

    connection.onopen = () => {
      console.log("/*-------------------- CLIENT-SEND -------------------- */");
      connection.send(MESSAGE);
      console.log("/*-------------------- CLIENT-SEND -------------------- */");
    };

    connection.onerror = (error) => {
      console.log("/*-------------------- CLIENT-ERROR -------------------- */");
      console.log(`WebSocket error: ${error}`);
      console.log("/*-------------------- CLIENT-ERROR -------------------- */");
    };

    connection.onmessage = (e) => {
      console.log("/*-------------------- CLIENT-MESSAGE -------------------- */");
      console.log(e.data);
      socket.emit("result", e.data);
      console.log("/*-------------------- CLIENT-MESSAGE -------------------- */");
    };
  }
}
