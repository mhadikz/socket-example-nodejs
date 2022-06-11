import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { MASTER_TOKEN, PORT } from "../constants/configs";
import SocketClient from "./client.socket";

export default class ServerSocket {
  private client: SocketClient;
  constructor(client: SocketClient) {
    this.client = client;
  }

  private app = express();
  private httpServer = createServer(this.app);
  private io = new Server(this.httpServer, {
    /* options */
  });

  isValidJwt = (header: string) => {
    const token = header.split(" ")[1];
    if (token === MASTER_TOKEN) {
      return true;
    } else {
      return false;
    }
  };

  connectToServer() {
    this.io.use((socket, next) => {
      const header = socket.handshake.headers["token"]?.toString() ?? "";
      if (this.isValidJwt(header)) {
        return next();
      }
      return next(new Error("Authentication error!"));
    });

    this.io.on("connection", (socket) => {
      console.log("/*-------------------- SERVER -------------------- */");
      console.log(`A socket connection has been made by this id:${socket.id}`);
      this.client.runSocket(socket);
      console.log("/*-------------------- SERVER -------------------- */");
    });
  }

  run() {
    this.httpServer.listen(PORT, () => {
      console.log(`Socket project is running on port ${PORT}`);
      console.log(`Go to : http://localhost:${PORT}`);
    });
    this.connectToServer();
  }
}
