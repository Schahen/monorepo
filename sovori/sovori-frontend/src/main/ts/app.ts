import {Test} from "./test.js";
import {LocalRouter} from "./LocalRouter.js";
import {State} from "./State";
import {CourseHttp} from "./api/CourseHttp";

let main = async function () {
  let router = new LocalRouter();
  router.register((path, state: State) => {
    if (path.match(/^\/courses\/(.*)/)) {
      state.save("course", RegExp.$1);
      return true;
    }
    return false;
  }, async function (state: State) {
    let courseId = state.get("course");

    if (courseId) {
      let courseHttp = new CourseHttp(courseId);
      let data = await courseHttp.all();
      let test = new Test(courseId, data);
      test.ask();
    }

  });

  router.run(location.pathname);
}

window.onload = main;
