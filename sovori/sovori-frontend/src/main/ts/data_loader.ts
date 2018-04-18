export class TestRecord {
  q: string;
  a: string;
}

export class DataLoaderResponse {
  data: TestRecord[];
}

export default class DataLoader {

  async load(course: string): Promise<DataLoaderResponse> {
    return fetch(`/api/courses/${course}`).then(r => r.json());
  }
}