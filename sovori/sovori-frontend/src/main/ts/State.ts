export class State {
  private state: Map<string, string> = new Map();

  save(key: string, state: string) {
    this.state.set(key, state);
  }

  get(key: string): string|undefined {
    return this.state.get(key);
  }
}