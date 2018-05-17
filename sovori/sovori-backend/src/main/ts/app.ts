import * as express from 'express';
import * as path from 'path';
import {coursesRouter} from "./api/coursesRouter";
import {Server as WebsocketServer} from "ws";

let registerPath = (app: express.Application, path: string, resolveTo: string) => {
  console.log(`${path} => ${resolveTo}`)
  app.use(<any>path, express.static(resolveTo));
}


let websocketServer = (port: number) => {
  const webSocketServer = new WebsocketServer({ port });

  webSocketServer.on('connection', function connection(webSocket) {

    webSocket.on('message', function incoming(message) {

    });

  });
}

let main = () => {
  let app = express();

  let pathToStatic = path.resolve(__dirname, '..',  '..', '..', '..', '..', '..', 'sovori-frontend', 'build');

  app.use("/api/courses", coursesRouter());

  registerPath(app, '/resources', pathToStatic);

  app.get("/courses/:course", function (req, res) {
    res.sendFile(path.resolve(pathToStatic, "index.html"));
  });

  let port = 4000;
  app.listen(port, function () {
    console.log(`app listening on port ${port}!`);
  });

  websocketServer(4001);
}


main();