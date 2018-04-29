import {Dialog} from "./Dialog";
import {find} from "../dom/find";


export class HtmlDialog implements Dialog {
  private container: HTMLDialogElement;

  constructor(container: HTMLDialogElement) {
    this.container = container;
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