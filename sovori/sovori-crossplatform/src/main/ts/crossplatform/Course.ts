export interface Course {
  validate(record: any): boolean;

  get(id: string): any;

  getValue(id: string): any;

  updateQuestion(id: string, question: string): any;

  updateAnswer(id: string, answer: string): void;

  all(): any;

  add(record: any): any;
}