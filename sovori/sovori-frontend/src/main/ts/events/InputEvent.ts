import {KeyDownEvent} from "./KeyDownEvent.js";
import {RegisteredEvent} from "./RegisteredEvent.js";
import {registerKeydown} from "./addRegisteredEvent.js";
import {LetterHandler} from "../keyboard/LetterHandler.js";


export module InputEvent {

  export let keyDown = (el: Element): RegisteredEvent<KeyDownEvent> => {

    return registerKeydown<KeyDownEvent>(el,  evt => {

     return {
       code: evt.code,
       key: evt.key,
       altKey: evt.altKey,
       metaKey: evt.metaKey,
       shiftKey: evt.shiftKey,
       capsLock: evt.getModifierState("CapsLock"),
       preventDefault: () => evt.preventDefault()
     }
    });
  }

  export function resolveLetter(event: RegisteredEvent<KeyDownEvent>, handler: LetterHandler): RegisteredEvent<string|undefined> {
    return event.on(evt => {
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
    });
  }

}