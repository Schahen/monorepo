export class TestRecord {
  q: string;
  a: string;
}

export class DataLoaderResponse {
  data: TestRecord[];
}

export default class DataLoader {

  async load(): Promise<DataLoaderResponse> {
    return fetch("/courses/deutsch").then(r => r.json());
  }
}