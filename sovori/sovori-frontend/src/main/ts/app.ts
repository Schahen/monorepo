import DataLoader, {TestRecord} from "./data_loader.js";
import {Test} from "./test.js";
import {LocalRouter} from "./LocalRouter.js";
import {State} from "./State";

let main = async function () {

  let router = new LocalRouter();
  router.register((path, state: State) => {
      if (path.match(/^\/courses\/(.*)/)) {
        state.save("course", RegExp.$1);
        return true;
      }
      return false;
  }, async function (state: State) {
    let dataLoader = new DataLoader();
    let courseId = state.get("course");
    let data = await dataLoader.load(courseId);
    let test = new Test(courseId, data);
    test.ask();
  });

  router.run(location.pathname);
}

window.onload = main;
