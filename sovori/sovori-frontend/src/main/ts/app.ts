import DataLoader from "./data_loader.js";
import {Test} from "./test.js";
import {LocalRouter} from "./LocalRouter.js";

let main = async function () {

  let router = new LocalRouter();
  router.register((path) => {
      return true;
  }, async function () {
    let dataLoader = new DataLoader();
    let response = await dataLoader.load();
    let data = response.data;
    let test = new Test(response.data);
    test.ask();
  });

  router.run(location.pathname);
}

window.onload = main;
