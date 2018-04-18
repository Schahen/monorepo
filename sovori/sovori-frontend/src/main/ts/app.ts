import DataLoader from "./data_loader.js";
import {Test} from "./test.js";
import {LocalRouter} from "./LocalRouter.js";
import {State} from "./State";

let main = async function () {

  let router = new LocalRouter();
  router.register((path, state: State) => {
      state.save("course", "deutsch");
      return true;
  }, async function (state: State) {
    let dataLoader = new DataLoader();
    let response = await dataLoader.load(state.get("course"));
    let data = response.data;
    let test = new Test(response.data);
    test.ask();
  });

  router.run(location.pathname);
}

window.onload = main;
