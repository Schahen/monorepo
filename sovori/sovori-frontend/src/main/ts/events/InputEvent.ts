import {CustomDomEvent} from "./customDomEvent.js";
import {KeyDownEvent} from "./KeyDownEvent.js";
import {RegisteredEvent} from "./RegisteredEvent.js";
import {registerEvent} from "./RegisterEvent.js";


export module InputEvent {

  export let keyDown = (el: Element): RegisteredEvent<KeyDownEvent> => {
    return registerEvent(el, "keydown", event => {
     let evt =  <KeyboardEvent> event;
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

}