import {QuestionRecord} from "./QuestionRecord.js";


export class Question {
  constructor(private testRecord: QuestionRecord) {
  }

  get question() {
    return this.testRecord.question.q;
  }

  get answer() {
    return this.testRecord.question.a;
  }

  get id() {
    return this.testRecord.question.id;
  }

  check(givenAnswer: string): boolean {
    let givenAnswerNormalized = givenAnswer.trim();

    if (this.answer === givenAnswerNormalized) {
      return true;
    }

    return false;
  }
}