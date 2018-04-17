import * as express from 'express';
import * as path from 'path';
import {coursesRouter} from "./api/courses";

let registerPath = (app: express.Application, path: string, resolveTo: string) => {
  console.log(`${path} => ${resolveTo}`)
  app.use(<any>path, express.static(resolveTo));
}

let main = () => {
  let app = express();

  let pathToStatic = path.resolve(__dirname, '..', '..', '..', 'sovori-frontend', 'build');

  app.use("/courses", coursesRouter());

  registerPath(app, '/data', <string><any>process.env.APP_DATA);
  registerPath(app, '/app', pathToStatic);

  let port = 3000;
  app.listen(port, function () {
    console.log(`app listening on port ${port}!`);
  });
}


main();