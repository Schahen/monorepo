import * as low from 'lowdb';
import {AdapterSync, Lowdb} from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as path from "path";
import {ErrorMessages} from "./error_messages";
import * as shortid from "shortid";
import {Course} from 'crossplatform/Course';
import {getDataDir} from "./dataDir";

export class CourseDB implements Course<any> {

  private id:string;
  private db:Lowdb<any, AdapterSync<any>>;

  constructor(id: string) {
    this.id = id;
    this.db = low(new FileSync(path.resolve(getDataDir(), `${this.id}.json`)));
  }

  validate(record: any): boolean {
    return record.hasOwnProperty("a") && record.hasOwnProperty("q");
  }

  get(id: string): any {
    let record = this.all().find({"id": id});
    if (record.size().value() == 0) {
      throw new Error(ErrorMessages.RECORD_NOT_FOUND);
    }
    console.log("GET", record.assign);
    return record;
  }

  getValue(id: string): any {
    return this.get(id).value();
  }

  updateQuestion(id: string, question: string) {
     return this.get(id).assign({"q": question}).write();
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