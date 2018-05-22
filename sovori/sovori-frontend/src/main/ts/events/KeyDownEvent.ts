
export type KeyDownEvent = {
  code: string,
  key: string,
  altKey: boolean,
  metaKey: boolean,
  rightMetaKey: boolean,
  leftMetaKey: boolean,
  shiftKey: boolean,
  capsLock: boolean,
  preventDefault: () => void;
}