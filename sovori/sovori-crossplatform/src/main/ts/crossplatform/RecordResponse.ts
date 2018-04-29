import {TestRecord} from "./TestRecord";

export type RecordResponse = {
  meta: {
    course_id: string
  },
  data: TestRecord
}
