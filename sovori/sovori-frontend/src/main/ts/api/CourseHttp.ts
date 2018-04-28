import {Course} from 'crossplatform/Course';
import {TestRecord} from "../TestRecord.js";

export class CourseHttp implements Course<Promise<TestRecord>> {

  private id:string;

  constructor(id: string) {
    this.id = id;
  }

  add(record: any): any {
  }

  async all(): Promise<TestRecord[]> {
    return fetch(`/api/courses/${this.id}`).then(r => r.json());
  }

  get(id: string): any {
  }

  getValue(id: string): any {
  }

  updateAnswer(id: string, answer: string): void {
  }

  updateQuestion(id: string, question: string): any {
    const url = `/api/courses/${this.id}/record/${id}/question`
    const body = {
      q: question
    }
    const fetchParams = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(body)
    };

    return fetch(url, fetchParams).then(r => r.json());
  }

  validate(record: any): boolean {
    return false;
  }

}