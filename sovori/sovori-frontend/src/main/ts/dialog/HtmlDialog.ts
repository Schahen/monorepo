import {Dialog} from "./Dialog";
import {getGlobalEvents} from "../globalEvents.js";
import {RegisteredEvent} from "../events/RegisteredEvent.js";
import {StackedEvent} from "../events/StackedEvent.js";

export class HtmlDialog implements Dialog {
  private container: HTMLDialogElement;

  protected openEvent: RegisteredEvent<null> = new StackedEvent();
  protected closeEvent: RegisteredEvent<null> = new StackedEvent();

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
    this.closeEvent.trigger(null);
  }

  open() {
    this.container.open = true;
    this.openEvent.trigger(null);
  }

  getDialogContainer() {
    return this.container;
  }

}