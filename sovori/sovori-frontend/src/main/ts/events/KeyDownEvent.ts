
export type KeyDownEvent = {
  code: string,
  key: string,
  altKey: boolean,
  metaKey: boolean,
  shiftKey: boolean,
  capsLock: boolean,
  preventDefault: () => void;
}