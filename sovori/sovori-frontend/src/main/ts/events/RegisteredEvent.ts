

export interface RegisteredEvent<T> {
  on(handler: (data: T) => void) : void;
  trigger(data: T): void;
}