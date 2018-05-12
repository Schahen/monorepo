import {KeyDownEvent} from "../events/KeyDownEvent.js";
import {LetterHandler} from "./LetterHandler.js";


export function letterFragment(evt: KeyDownEvent, handler: LetterHandler): string | null {
  if (evt.metaKey) {
    if (evt.altKey) {
      let isUppercase = evt.shiftKey || evt.capsLock;

      let fragment = handler(evt.code, isUppercase);

      if (fragment !== null) {
        evt.preventDefault();
        return fragment;
      }
    }
  }

  return null;
}