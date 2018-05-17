
export function getWebsocketPort():number {
  return 4001;
}

export function getWebsocketUrl() {
  return `ws://127.0.0.1:${getWebsocketPort()}`;
}