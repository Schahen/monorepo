import * as low from 'lowdb';
import {LowdbSync} from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as path from "path";
import {getDataDir} from "./dataDir";

export class Courses {

  private db:LowdbSync<any>;

  constructor() {

    const coursesDataFilePath = path.resolve(getDataDir(), "..", "courses.json");

    this.db = low(new FileSync(coursesDataFilePath));
  }

  get(): any {
    return this.db.get("data");
  }

}