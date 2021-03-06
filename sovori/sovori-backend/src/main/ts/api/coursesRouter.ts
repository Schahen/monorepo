import {Router} from "express-serve-static-core";
import * as express from 'express';
import {jsonResponse} from "./jsonResponse";
import * as bodyParser from 'body-parser';
import {Courses} from "./Courses";
import {CourseDB} from "./CourseDB";
import {questionRouter} from "./questionRouter";
import {ErrorMessages} from "./error_messages";
import {RecordResponse} from "crossplatform/RecordResponse";
import * as WebSocket from 'ws';

export function coursesRouter(websocket: WebSocket): Router {

  const router = express.Router();

  router.use(bodyParser.json());

  router.param('courseid', function (req, res, next, name) {
    res.locals['courseid'] = name;
    next();
  });

  router.use("/:courseid/record", questionRouter(websocket));

  router.get('/:courseid', (req, res) => {
    jsonResponse(res, new CourseDB(req.params.courseid).all());
  });

  router.post('/:courseid', (req, res) => {
    let course = new CourseDB(req.params.courseid);
    let record = req.body;
    try {
      let addedRecord = course.add(record);
      jsonResponse<RecordResponse>(res, {
        meta: {
          course_id: res.locals["courseid"]
        },
        data: addedRecord
      });
    } catch (e) {
      if (e.message == ErrorMessages.INVALID_RECORD) {
        res.status(400).send({error: ErrorMessages.INVALID_RECORD});
      } else {
        res.status(500).send({error: e.message})
      }
    }
    let ad
  });


  router.get('/', (req, res) => {
    jsonResponse(res, new Courses().get());
  });

  return router;
}