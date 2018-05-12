

export interface RegisteredEvent<T> {
  on<R>(handler: (data: T) => R) : RegisteredEvent<R>;
  trigger(data: T): void;
}