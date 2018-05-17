import {Test} from "./test.js";
import {LocalRouter} from "./LocalRouter.js";
import {State} from "./State.js";
import {CourseHttp} from "./api/CourseHttp.js";
import {getGlobalEvents} from "./globalEvents.js";


async function openSocket(): Promise<WebSocket> {
  let url = 'ws://127.0.0.1:4001';
  var socket = new WebSocket("ws://127.0.0.1:4001", ["protocolOne", "protocolTwo"]);

  socket.onmessage = function(message) {
    console.log("message", message);
  }

  return new Promise<WebSocket>(resolve => {
    socket.onopen = function() {
      resolve(socket);
      socket.send("client websocket opened");
    }
  });


}


async function main() {

  let globalEvents = getGlobalEvents()

  document.body.addEventListener("keydown", evt => {
    if (evt.key == "Escape") {
      globalEvents.trigger(new CustomEvent("KEY_ESC"));
    }

    if (evt.metaKey && evt.shiftKey) {
      if (evt.code == "KeyA") {
        globalEvents.trigger(new CustomEvent("ADD_RECORD"));
      } else if (evt.code == "KeyE") {
        globalEvents.trigger(new CustomEvent("EDIT_RECORD"));
      }
    }
  });

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
