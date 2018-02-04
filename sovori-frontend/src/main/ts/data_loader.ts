export class TestRecord {
  q: string;
  a: string;
}

export class DataLoaderResponse {
  data: TestRecord[];
}

export default class DataLoader {

  async load(): Promise<DataLoaderResponse> {
    return fetch("/data/data.json").then(r => r.json());
  }
}