import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as path from "path";
import {AdapterSync, Lowdb, lowdb} from "lowdb";
import {ErrorMessages} from "./error_messages";
import * as shortid from "shortid";

export class Course {

  private static dataDir = process.env.APP_DATA;

  private id:string;
  private db:Lowdb<any, AdapterSync<any>>;

  constructor(id: string) {
    this.id = id;
    this.db = low(new FileSync(path.resolve(Course.dataDir, `${this.id}.json`)));
  }

  validate(record: any): boolean {
    return record.hasOwnProperty("a") && record.hasOwnProperty("q");
  }

  get(id: string): any {
    let record = this.all().find({"id": id});
    if (record.size().value() == 0) {
      throw new Error(ErrorMessages.RECORD_NOT_FOUND);
    }
    return record;
  }

  getValue(id: string): any {
    return this.get(id).value();
  }

  updateQuestion(id: string, question: string) {
    return this.get(id).assign({"q": question}).write().value();
  }

  updateAnswer(id: string, answer: string) {
    this.get(id).assign({"a": answer}).write();
  }

  all(): any {
    return this.db.get("data");
  }

  add(record: any): any {
    if (this.validate(record)) {
      let id = shortid.generate();
      record.id = id;
      this.all().push(record).write();
      return this.all().find(record).value();
    } else {
      throw new Error(ErrorMessages.INVALID_RECORD);
    }
  }

}