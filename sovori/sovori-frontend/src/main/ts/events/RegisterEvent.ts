import {RegisteredEvent} from "./RegisteredEvent";
import {StackedEvent} from "./StackedEvent.js";

export function registerEvent<T>(el: Element, evtName: string, fromEvent: (evt: Event) => T): RegisteredEvent<T> {

  let stackedEvent = new StackedEvent<T>();

  el.addEventListener(evtName, event => {
      let evt = fromEvent(event);
      stackedEvent.trigger(evt);
  });

  return stackedEvent;
}