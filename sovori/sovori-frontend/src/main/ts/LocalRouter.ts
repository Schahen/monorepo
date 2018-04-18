export class LocalRouterRecord {
  private condition: (path: string) => boolean;
  private handler: () => void;

  constructor(condition: (path: string) => boolean, handler: () => void) {
    this.condition = condition;
    this.handler = handler;
  }

  conditionalExecute(path: string) {
    let condition = this.condition(path);
    if (condition) {
      this.handler();
    }
    return condition;
  }
}

export class LocalRouter {

  private routes: Array<LocalRouterRecord>

  constructor() {
    this.routes = [];
  }

  register(path: (path: string) => boolean, handler: () => void) {
    this.routes.push(new LocalRouterRecord(path, handler));
  }

  run(path: string) {
    for (let localRouterRecord of this.routes) {
      if (localRouterRecord.conditionalExecute(path)) {
        break;
      }
    }
  }
}