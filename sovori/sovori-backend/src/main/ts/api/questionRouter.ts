import {Router} from "express-serve-static-core";
import * as express from 'express';
import {jsonResponse} from "./jsonResponse";
import * as bodyParser from 'body-parser';
import {CourseDB} from "./CourseDB";
import {ErrorMessages} from "./error_messages";


export function questionRouter(): Router {

  const dataDir = process.env.APP_DATA;

  const router = express.Router();
  router.use(bodyParser.json())

  router.get('/:id', (req, res) => {
    try {
      let data = new CourseDB(res.locals["courseid"]).getValue(req.params.id);

      jsonResponse(res, {
        meta: {
          course_id: res.locals["courseid"]
        },
        data
      });
    } catch (e) {
      if (e.message == ErrorMessages.RECORD_NOT_FOUND) {
        res.status(404).send({error: ErrorMessages.RECORD_NOT_FOUND});
      } else {
        res.status(500).send({error: e.message});
      }
    }
  });

  router.post('/:id/question', (req, res) => {
    try {
      let record = req.body;
      if (!record.hasOwnProperty("q")) {
        throw new Error(ErrorMessages.QUESTION_NOT_PRESENT);
      }

      let course = new CourseDB(res.locals["courseid"]);

      course.updateQuestion(req.params.id, record.q);
    } catch (e) {
      if (e.message == ErrorMessages.RECORD_NOT_FOUND) {
        res.status(404).send({error: ErrorMessages.RECORD_NOT_FOUND});
      } else if (e.message == ErrorMessages.QUESTION_NOT_PRESENT) {
        res.status(400).send({error: ErrorMessages.QUESTION_NOT_PRESENT});
      } else {
        res.status(500).send({error: e.message});
      }
    }
  });


  return router;
}