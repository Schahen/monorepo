import {TestRecord} from "./data_loader";


export class Question {
  constructor(private testRecord: TestRecord) {}

  get question() {
    return this.testRecord.q;
  }

  get answer() {
    return this.testRecord.a;
  }

  check(givenAnswer: string): boolean {
    let givenAnswerNormalized = givenAnswer.trim();
    console.debug(givenAnswerNormalized, this.answer);
    if (this.answer === givenAnswerNormalized) {
      return true;
    }

    return false;
  }
}