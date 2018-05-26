import {TestRecord} from "crossplatform/TestRecord.js";

export class Question {

  private questionRecord: TestRecord;
  answeredWrong: number = 0;
  answeredRight: number = 0;

  constructor(questionRecord: TestRecord) {
    this.questionRecord = questionRecord;
  }

  get question() {
    return this.questionRecord.q;
  }

  get answer() {
    return this.questionRecord.a;
  }

  get id() {
    return this.questionRecord.id;
  }

  countWrongAnswer() {
    this.answeredWrong++;
  }

  countRightAnswer() {
    this.answeredRight++;
  }

  getLearningRatio(): number {
    if (this.answeredRight === 0) {
      return (this.answeredWrong + 1);
    }

    return (this.answeredWrong / this.answeredRight) + 1;
  }

  check(givenAnswer: string): boolean {
    let givenAnswerNormalized = givenAnswer.trim();

    if (this.answer === givenAnswerNormalized) {
      return true;
    }

    return false;
  }
}