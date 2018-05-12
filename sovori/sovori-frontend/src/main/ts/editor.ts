import {CustomDomEvent} from "./events/customDomEvent.js";
import {germanLetterHandler} from "./keyboard/germanLetterHandler.js";
import {insertFragment} from "./dom/insertFragment.js";
import {KeyDownEvent} from "./events/KeyDownEvent.js";
import {InputEvent} from "./events/InputEvent.js";


export class Editor {

  private _eventsHandler: CustomDomEvent

  constructor(private element: Element) {
    this._eventsHandler = new CustomDomEvent(element);
    this.initEvents();
  }

  private initEvents() {

    InputEvent.keyDown(this.element, "editorKeyDown", this._eventsHandler);

    this._eventsHandler.listen("editorKeyDown", event => {
      let evt = <KeyDownEvent>(<CustomEvent> event).detail;

      if (evt.metaKey) {
        if (evt.altKey) {
          let isUppercase = evt.shiftKey || evt.capsLock;

          let fragment = germanLetterHandler(evt.code, isUppercase);

          if (fragment !== null) {
            evt.preventDefault();
            this.insertFragment(fragment);
          }
        }
      }
    });
  }

  insertFragment(fragment: string, range?: Range) {
    insertFragment(this.element, fragment, range);
  }

  replace(value: string) {
    let range = document.createRange();
    range.selectNodeContents(this.element);
    let sel = window.getSelection();
    sel.removeAllRanges()
    sel.addRange(range);

    this.insertFragment(value, range);
  }

  public getValue(): string {
    return this.element.textContent || '';
  }


  get eventsManager(): CustomDomEvent {
    return this._eventsHandler;
  }
}

