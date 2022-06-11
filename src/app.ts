import ClientSocket from "./sockets/client.socket";
import ServerSocket from "./sockets/server.socket";

const client = new ClientSocket();
const server = new ServerSocket(client);
server.run();
