import {TestRecord} from "./data_loader";


export class Question {
  constructor(private testRecord: TestRecord) {}

  get question() {
    return this.testRecord.q;
  }

  get answer() {
    return this.testRecord.a;
  }
}