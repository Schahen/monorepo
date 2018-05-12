import {RegisteredEvent} from "./RegisteredEvent";

export function registerEvent<T>(el: Element, evtName: string, eventFrom: (evt: Event) => T): RegisteredEvent<T> {

  let handlers: ((evt: T) => void)[] = [];

  el.addEventListener(evtName, event => {
      let evt = eventFrom(event);
      for (let handler of handlers) {
        handler(evt);
      }
  });

  return {
    on: function(handler: (evt: T) => void) {
      handlers.push(handler);
    }
  }
}