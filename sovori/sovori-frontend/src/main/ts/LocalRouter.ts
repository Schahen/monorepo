
export class LocalRouter {

  private routes: Map<((path: string) => boolean), () => void>

  constructor() {
    this.routes = new Map();
  }

  register(path: (path: string) => boolean, handler: () => void) {
    this.routes.set(path, handler)
  }

  run(path: string) {
    for (let [condition, handler] of this.routes) {
      if (condition(path)) {
        handler();
        break;
      }
    }
  }
}