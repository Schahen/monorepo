import * as express from 'express';
import * as path from 'path';

let main = () => {
    let app = express();

    let pathToStatic = path.resolve(__dirname, '..', '..', '..', 'sovori-frontend', 'build');
    console.log("path to static", pathToStatic);
    app.use('/', express.static(pathToStatic));

    let port = 3000;
    app.listen(port, function () {
        console.log(`app listening on port ${port}!`);
    });
}


main();