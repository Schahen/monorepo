import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as path from "path";
import {AdapterSync, Lowdb, lowdb} from "lowdb";

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

  get(): any {
    return this.db.get("data");
  }

  update(record: any) {
    this.db.get("data").push(record).write();
  }

}