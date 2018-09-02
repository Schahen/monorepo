import * as express from 'express';
import * as path from 'path';
import {coursesRouter} from "./api/coursesRouter";
import * as WebSocket from "ws";
import {getWebsocketPort, getWebsocketUrl} from "./websocket/getWebsocketUrl";

let WebsocketServer = WebSocket.Server;

let registerPath = (app: express.Application, path: string, resolveTo: string) => {
  console.log(`${path} => ${resolveTo}`)
  app.use(<any>path, express.static(resolveTo));
}


function startWebsocketServer(port: number) {
   new Promise<WebSocket>(resolve => {
    const webSocketServer = new WebsocketServer({ port });
    console.log(`websockets on port ${port}`);

    webSocketServer.on('connection', function connection(webSocket) {

      console.log("[ws] connection established");

      resolve(webSocket);

      webSocket.on('message', function incoming(message) {
        console.log('[ws] message received', message);
      });

    });
  });
}

function createWebSocket(): Promise<WebSocket> {
  return new Promise<WebSocket>(resolve => {
    const ws = new WebSocket(getWebsocketUrl());

    ws.on('open', function open() {
      resolve(ws);
    });
  });
}

async function main() {
  let app = express();

  let pathToStatic = path.resolve(__dirname, '..',  '..', '..', '..', '..', '..', 'sovori-frontend', 'build');

  let webSocketServer = await startWebsocketServer(getWebsocketPort());
  let webSocket = await createWebSocket();

  let port = 4000;
  app.listen(port,  function () {
    console.log(`app listening on port ${port}!`);

    app.use("/api/courses", coursesRouter(webSocket));

    registerPath(app, '/resources', pathToStatic);

    app.get("/courses", function (req, res) {
      res.sendFile(path.resolve(pathToStatic, "courses.html"));
    });

    app.get("/courses/:course", function (req, res) {
      res.sendFile(path.resolve(pathToStatic, "index.html"));
    });

  });
}


main();