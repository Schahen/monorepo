export class Courses {

  static validate(record: any): boolean {
    return record.hasOwnProperty("a") && record.hasOwnProperty("q");
  }

}