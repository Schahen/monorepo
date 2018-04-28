import {TestRecord} from "./TestRecord.js";


export class DataLoaderResponse {
  data: TestRecord[];
}

export default class DataLoader {

  async load(course: string): Promise<TestRecord[]> {
    return fetch(`/api/courses/${course}`).then(r => r.json());
  }
}