import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as path from "path";
import {AdapterSync, Lowdb, lowdb} from "lowdb";

export class Courses {

  private static dataDir = process.env.APP_DATA;

  private db:Lowdb<any, AdapterSync<any>>;

  static validate(record: any): boolean {
    return record.hasOwnProperty("a") && record.hasOwnProperty("q");
  }

  constructor() {
    this.db = low(new FileSync(path.resolve(Courses.dataDir, "courses.json")));
  }

  get(): any {
    return this.db.get("data");
  }

}