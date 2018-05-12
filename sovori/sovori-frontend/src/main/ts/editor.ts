import {CustomDomEvent} from "./customDomEvent.js";
import {germanLetterHandler} from "./keyboard/germanLetterHandler.js";


export class Editor {

  private _eventsHandler: CustomDomEvent

  constructor(private element: Element) {
    this._eventsHandler = new CustomDomEvent(element);
    this.initEvents();
  }

  private initEvents() {
    this.element.addEventListener("keydown", (event: Event) => {
      const evt = <KeyboardEvent> event;

      this._eventsHandler.trigger(new CustomEvent("editorKeyDown", {detail: {
          code: evt.code,
          key: evt.key,
          metaKey: evt.metaKey,
          shiftKey: evt.shiftKey
        }}));
      if (evt.metaKey) {
        if (evt.altKey) {
          let isUppercase = evt.shiftKey || evt.getModifierState("CapsLock");

          let fragment = germanLetterHandler(evt.code, isUppercase);

          if (fragment !== null) {
            evt.preventDefault();
            this.insertFragment(fragment)
          }

        }
      }
    })
  }

  insertFragment(fragment: string, range?: Range) {
    if (!range) {
      range = window.getSelection().getRangeAt(0);
    }

    range.deleteContents();
    range.insertNode(document.createTextNode(fragment));
    range.collapse(false);

    this.element.normalize();
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

