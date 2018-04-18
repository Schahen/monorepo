import {State} from "./State.js";

export class LocalRouterRecord {
  private condition: (path: string, state: State) => boolean;
  private handler: (state: State) => void;

  constructor(condition: (path: string, state: State) => boolean, handler: (state: State) => void) {
    this.condition = condition;
    this.handler = handler;
  }

  conditionalExecute(path: string) {
    let state = new State();
    let condition = this.condition(path, state);
    if (condition) {
      this.handler(state);
    }
    return condition;
  }
}

export class LocalRouter {

  private routes: Array<LocalRouterRecord>

  constructor() {
    this.routes = [];
  }

  register(path: (path: string, state: State) => boolean, handler: (state: State) => void) {
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