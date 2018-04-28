import {TestRecord} from "./TestRecord.js";


export class Question {
  constructor(private testRecord: TestRecord) {}

  get question() {
    return this.testRecord.q;
  }

  get answer() {
    return this.testRecord.a;
  }

  get id() {
    return this.testRecord.id;
  }

  check(givenAnswer: string): boolean {
    let givenAnswerNormalized = givenAnswer.trim();

    if (this.answer === givenAnswerNormalized) {
      return true;
    }

    return false;
  }
}