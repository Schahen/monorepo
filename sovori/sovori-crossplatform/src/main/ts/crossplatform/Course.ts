export interface Course<T> {
  validate(record: any): boolean;

  get(id: string): any;

  getValue(id: string): any;

  updateQuestion(id: string, question: string): any;

  updateAnswer(id: string, answer: string): void;

  all(): T extends Promise<infer U> ? Promise<U[]> : T[];

  add(record: any): T extends Promise<infer U> ? Promise<U> : T;
}