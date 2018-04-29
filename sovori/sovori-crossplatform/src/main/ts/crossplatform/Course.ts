export interface Course<T, R> {
  validate(record: any): boolean;

  get(id: string): any;

  getValue(id: string): any;

  updateQuestion(id: string, question: string): any;

  updateAnswer(id: string, answer: string): void;

  all(): T extends Promise<infer U> ? Promise<U[]> : T[];

  add(record: any): R extends Promise<infer U> ? Promise<U> : R;
}