import * as express from 'express';
import * as path from 'path';
import {coursesRouter} from "./api/coursesRouter";

let registerPath = (app: express.Application, path: string, resolveTo: string) => {
  console.log(`${path} => ${resolveTo}`)
  app.use(<any>path, express.static(resolveTo));
}

let main = () => {
  let app = express();

  let pathToStatic = path.resolve(__dirname, '..', '..', '..', '..', '..', '..', 'sovori-frontend', 'build');

  app.use("/api/courses", coursesRouter());

  registerPath(app, '/resources', pathToStatic);

  app.get("/courses/:course", function (req, res) {
    res.sendFile(path.resolve(pathToStatic, "index.html"));
  });

  let port = 3000;
  app.listen(port, function () {
    console.log(`app listening on port ${port}!`);
  });
}


main();