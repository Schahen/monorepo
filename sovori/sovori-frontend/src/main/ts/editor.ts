import {germanLetterHandler} from "./keyboard/germanLetterHandler.js";
import {insertFragment} from "./dom/insertFragment.js";
import {KeyDownEvent} from "./events/KeyDownEvent.js";
import {InputEvent} from "./events/InputEvent.js";
import {RegisteredEvent} from "./events/RegisteredEvent.js";


export class Editor {

  private keyDownRegistration: RegisteredEvent<KeyDownEvent>

  constructor(private element: Element) {
    this.keyDownRegistration = InputEvent.keyDown(this.element);
    this.initEvents();
  }

  private initEvents() {

    InputEvent.resolveLetter(this.keyDownRegistration, germanLetterHandler).on(fragment => {
      this.insertFragment(fragment);
    });

  }

  insertFragment(fragment: string | undefined, range?: Range) {
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


  getKeyDownRegistration(): RegisteredEvent<KeyDownEvent> {
    return this.keyDownRegistration;
  }

}

