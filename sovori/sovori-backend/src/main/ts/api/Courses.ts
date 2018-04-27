import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as path from "path";
import {AdapterSync, Lowdb, lowdb} from "lowdb";
import {getDataDir} from "./dataDir";

export class Courses {

  private db:Lowdb<any, AdapterSync<any>>;

  constructor() {
    this.db = low(new FileSync(path.resolve(getDataDir(), "courses.json")));
  }

  get(): any {
    return this.db.get("data");
  }

}