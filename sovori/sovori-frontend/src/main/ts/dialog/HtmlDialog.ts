import {Dialog} from "./Dialog";
import {find} from "../dom/find";
import {getGlobalEvents} from "../globalEvents.js";


export class HtmlDialog implements Dialog {
  private container: HTMLDialogElement;

  constructor(container: HTMLDialogElement) {
    this.container = container;

    getGlobalEvents().listen("KEY_ESC", evt => {
      if (this.container.open) {
        this.close();
      }
    });
  }

  close() {
    this.container.open = false;
  }

  open() {
    this.container.open = true;
  }

  getDialogContainer() {
    return this.container;
  }

}