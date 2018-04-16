import DataLoader from "./data_loader.js";
import {Test} from "./test.js";

let main = async function () {
    let dataLoader = new DataLoader();
    let response = await dataLoader.load();
    let data = response.data;
    let test = new Test(response.data);



    test.ask();
}

window.onload = main;
