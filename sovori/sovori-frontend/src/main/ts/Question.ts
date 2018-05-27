import {TestRecord} from "crossplatform/TestRecord.js";
import {QuestionCheckFailed, QuestionCheckPassed, QuestionCheckResult} from "./QuestionCheckResult.js";

export class Question {

  public static NORMAL_WEIGHT = 10;

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
    return Question.NORMAL_WEIGHT + Math.max(2 * this.answeredWrong - this.answeredRight, 1);
  }

  check(givenAnswer: string): QuestionCheckResult {
    let givenAnswerNormalized = givenAnswer.trim();

    if (this.answer === givenAnswerNormalized) {
      return new QuestionCheckPassed();
    }

    return new QuestionCheckFailed();
  }
}