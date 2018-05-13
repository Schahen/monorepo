import {RegisteredEvent} from "./RegisteredEvent";


export class StackedEvent<T> implements RegisteredEvent<T>{

  handlers: ((evt: T) => void)[] = [];

  trigger(evt: T) {
    for (let handler of this.handlers) {
      handler(evt);
    }
  }

  on<R>(handler: (evt: T) => R): RegisteredEvent<R> {
    let event = new StackedEvent<R>();

    this.handlers.push(data => {
      if (data !== undefined) {
        event.trigger(handler(data))
      }
    });

    return event;
  }

  delegate(to: RegisteredEvent<T>): void {
    this.on(data => {
      to.trigger(data);
    })
  }

}