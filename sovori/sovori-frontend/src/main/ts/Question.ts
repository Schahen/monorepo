import {TestRecord} from "crossplatform/TestRecord.js";
import {QuestionCheckFailed, QuestionCheckPassed} from "./QuestionCheckResult.js";

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

  private normalize(message: string): string {
    return message.trim();
  }

  check(givenAnswer: string): QuestionCheckPassed | QuestionCheckFailed {
    let givenAnswerNormalized = this.normalize(givenAnswer);
    let answer = this.normalize(this.answer);

    let passed = true;
    let failedIndex = -1;

    let i = 0;
    for (let l = answer.length; i < l; i++) {
      const a = answer[i];
      const b = givenAnswerNormalized[i];

      if (b === undefined) {
        passed = false;
        failedIndex = i;
        break;
      }

      if (a !== b) {
        passed = false;
        failedIndex = i;
        break;
      }
    }
    if (passed && givenAnswerNormalized.length > i) {
      failedIndex = i;
      passed = false;
    }

    let goodPrefix = givenAnswerNormalized.substr(0, failedIndex);
    let rest = givenAnswerNormalized.substr(failedIndex);
    // console.log("PASSED =>", goodPrefix, "<==>", rest, "<=", failedIndex, passed);

    if (passed) {
      return new QuestionCheckPassed();
    } else {
      return new QuestionCheckFailed(goodPrefix, rest);
    }

  }
}