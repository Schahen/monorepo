import {CustomDomEvent} from "./customDomEvent.js";


export class Editor {

  private _eventsHandler: CustomDomEvent

  constructor(private element: Element) {
    this._eventsHandler = new CustomDomEvent(element);
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

