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

export function registerKeypress<T>(el: Element, fromEvent: (evt: KeyboardEvent) => T) {
  return addRegisteredEvent<T, KeyboardEvent>(el, "keypress", fromEvent);
}

export function registerKeydown<T>(el: Element, fromEvent: (evt: KeyboardEvent) => T) {
  return addRegisteredEvent<T, KeyboardEvent>(el, "keydown", fromEvent);
}