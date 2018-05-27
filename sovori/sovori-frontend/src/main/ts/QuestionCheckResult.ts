

export interface QuestionCheckResult {
  passed(): boolean;
}

export class QuestionCheckPassed implements  QuestionCheckResult {
  passed(): boolean {
    return true;
  }
}

export class QuestionCheckFailed implements QuestionCheckResult {
  passed(): boolean {
    return false;
  }


  constructor(public gootPrefix: string, public rest: string) {
  }
}