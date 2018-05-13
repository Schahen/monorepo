import {RegisteredEvent} from "./RegisteredEvent";
import {StackedEvent} from "./StackedEvent.js";

export function addRegisteredEvent<T, E extends Event>(el: Element, evtName: string, fromEvent: (evt: E) => T): RegisteredEvent<T> {

  let stackedEvent = new StackedEvent<T>();

  el.addEventListener(evtName, event => {
    let evt = fromEvent(<E>event);
    stackedEvent.trigger(evt);
  });

  return stackedEvent;
}