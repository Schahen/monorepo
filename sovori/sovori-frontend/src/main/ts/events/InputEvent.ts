import {CustomDomEvent} from "./customDomEvent";
import {KeyDownEvent} from "./KeyDownEvent";


export module InputEvent {

  export let keyDown = (el: Element, eventName: string, customEvent: CustomDomEvent) => {
    el.addEventListener("keydown", event => {
      const evt = <KeyboardEvent> event;

      customEvent.trigger(new CustomEvent<KeyDownEvent>(eventName, {
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
  }

}