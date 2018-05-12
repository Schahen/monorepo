

export interface RegisteredEvent<T> {
  on(handler: (evt: T) => void) : void;
}