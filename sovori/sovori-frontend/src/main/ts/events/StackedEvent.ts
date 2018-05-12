import {RegisteredEvent} from "./RegisteredEvent";


export class StackedEvent<T> implements RegisteredEvent<T>{

  handlers: ((evt: T) => void)[] = [];

  trigger(evt: T) {
    for (let handler of this.handlers) {
      handler(evt);
    }
  }

  on(handler: (evt: T) => void): void {
    this.handlers.push(handler);
  }

}