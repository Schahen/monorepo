export class TestRecord {
  q: string;
  a: string;
  id: string;
}

export class DataLoaderResponse {
  data: TestRecord[];
}

export default class DataLoader {

  async load(course: string|undefined): Promise<TestRecord[]> {
    return fetch(`/api/courses/${course}`).then(r => r.json());
  }
}