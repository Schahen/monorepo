import {CustomDomEvent} from "./customDomEvent.js";


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
          if (evt.code == "KeyS") {
            evt.preventDefault();
            this.insertFragment(isUppercase ? 'Sch' : 'sch');
          } else if (evt.code == "KeyT") {
            evt.preventDefault();
            this.insertFragment(isUppercase ? 'Tsch' : 'tsch');
          } else if (evt.code == "KeyO") {
            evt.preventDefault();
            this.insertFragment(isUppercase ? 'Ö' : 'ö');
          } else if (evt.code == "KeyU") {
            evt.preventDefault();
            this.insertFragment(isUppercase ? 'Ü' : 'ü');
          } else if (evt.code == "KeyA") {
            evt.preventDefault();
            this.insertFragment(isUppercase ? 'Ä' : 'ä');
          } else if (evt.code == "KeyC") {
            evt.preventDefault();
            this.insertFragment(isUppercase ? 'Ch' : 'ch');
          } else if (evt.code == "KeyX") {
            evt.preventDefault();
            this.insertFragment(isUppercase ? 'Ch' : 'ch');
          } else if (evt.code == "KeyE") {
            evt.preventDefault();
            this.insertFragment(isUppercase ? 'Ei' : 'ei');
          } else if (evt.code == "KeyJ") {
            evt.preventDefault();
            this.insertFragment(isUppercase ? 'Äu' : 'äu');
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

