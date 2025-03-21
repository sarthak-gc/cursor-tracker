import { WebSocketServer } from "ws";
import url from "url";
import http from "http";
import { v4 } from "uuid";

const httpServer = http.createServer();
const wsServer = new WebSocketServer({ server: httpServer });

const connections = {};
const users = {};

const handleClose = (uuid) => {
  delete connections[uuid];
  delete users[uuid];
  broadcastUsers();
};

const broadcastUsers = () => {
  Object.keys(connections).forEach((uuid) => {
    const connection = connections[uuid];
    const message = JSON.stringify(users);
    connection.send(message);
  });
};
const handleMsg = (bytes, uuid) => {
  const msg = bytes.toString();
  const message = JSON.parse(msg);
  const user = users[uuid];
  user.state = message;

  broadcastUsers();
  console.log(user);
};
wsServer.on("connection", (connection, request) => {
  const { username } = url.parse(request.url, true).query;
  const uuid = v4();
  connections[uuid] = connection;
  users[uuid] = {
    username,
    state: {},
  };
  console.log(username, "connected");
  connection.on("message", (message) => {
    handleMsg(message, uuid);
  });
  connection.on("close", () => {
    handleClose(uuid);
  });
});
httpServer.listen(4000, () => {
  console.log("running");
});
