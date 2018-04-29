import {CustomDomEvent} from "./customDomEvent.js";

export let getGlobalEvents = () => {
  return new CustomDomEvent(document.body);
}