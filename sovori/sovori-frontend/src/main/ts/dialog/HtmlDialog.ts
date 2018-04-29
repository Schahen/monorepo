import {Dialog} from "./Dialog";
import {find} from "../dom/find";
import {getGlobalEvents} from "../globalEvents.js";
import {CustomDomEvent} from "../customDomEvent.js";
import {DialogEvents} from "./DialogEvents.js";


export class HtmlDialog implements Dialog {
  private container: HTMLDialogElement;
  private _events: CustomDomEvent;

  constructor(container: HTMLDialogElement) {
    this.container = container;
    this._events = new CustomDomEvent(container);

    getGlobalEvents().listen("KEY_ESC", evt => {
      if (this.container.open) {
        this.close();
      }
    });
  }

  close() {
    this.container.open = false;
    this._events.trigger(new CustomEvent(DialogEvents.ONCLOSE));
  }

  open() {
    this.container.open = true;
    this._events.trigger(new CustomEvent(DialogEvents.ONOPEN));
  }

  on(event: DialogEvents, handler: () => void) {
    this._events.listen(event, evt => {
      handler();
    });
  }

  getDialogContainer() {
    return this.container;
  }

}