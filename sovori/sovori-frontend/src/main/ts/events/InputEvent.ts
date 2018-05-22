import {KeyDownEvent} from "./KeyDownEvent.js";
import {RegisteredEvent} from "./RegisteredEvent.js";
import {registerKeydown, withKeyDown} from "./addRegisteredEvent.js";
import {LetterHandler} from "../keyboard/LetterHandler.js";


export module InputEvent {

  export let keyDown = (el: Element): RegisteredEvent<KeyDownEvent> => {

    let rightMeta = true;
    let leftMeta = true;

    withKeyDown(el).on(evt => {
      if (evt.metaKey) {
        if (evt.location == 1) {
          leftMeta = true;
          rightMeta = false;
        } else if (evt.location == 2) {
          rightMeta = true;
          leftMeta = false;
        }
      }
    });

    return registerKeydown<KeyDownEvent>(el,  evt => {

     let isCapsLock = evt.getModifierState("CapsLock");
     let isUpperCase = evt.shiftKey || isCapsLock;

     return {
       code: evt.code,
       key: evt.key,
       altKey: evt.altKey,
       metaKey: evt.metaKey,
       shiftKey: evt.shiftKey,
       capsLock: isCapsLock,
       isUpperCase,
       rightMetaKey: evt.metaKey && rightMeta,
       leftMetaKey: evt.metaKey && leftMeta,
       preventDefault: () => evt.preventDefault()
     }
    });
  }

  export function resolveLetter(event: RegisteredEvent<KeyDownEvent>, handler: LetterHandler): RegisteredEvent<string|undefined> {
    return event.on(evt => {
      console.log(evt);

      if (evt.metaKey) {
        if (evt.altKey) {
          let fragment = handler(evt);

          if (fragment !== null) {
            evt.preventDefault();
            return fragment;
          }
        }
      }
    });
  }

}