import {CustomDomEvent} from "./customDomEvent.js";
import {germanLetterHandler} from "./keyboard/germanLetterHandler.js";
import {insertFragment} from "./dom/insertFragment.js";
import {KeyDownEvent} from "./events/KeyDownEvent.js";


export class Editor {

  private _eventsHandler: CustomDomEvent

  constructor(private element: Element) {
    this._eventsHandler = new CustomDomEvent(element);
    this.initEvents();
  }

  private initEvents() {
    this.element.addEventListener("keydown", (event: Event) => {
      const evt = <KeyboardEvent> event;

      this._eventsHandler.trigger(new CustomEvent<KeyDownEvent>("editorKeyDown", {
        detail: {
          code: evt.code,
          key: evt.key,
          altKey: evt.altKey,
          metaKey: evt.metaKey,
          shiftKey: evt.shiftKey,
          capsLock: evt.getModifierState("CapsLock"),
          preventDefault: () => evt.preventDefault()
        }
      }));
    });

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

