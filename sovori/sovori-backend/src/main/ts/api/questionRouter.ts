import {Router} from "express-serve-static-core";
import * as express from 'express';
import {jsonResponse} from "./jsonResponse";
import * as bodyParser from 'body-parser';
import {CourseDB} from "./CourseDB";
import {ErrorMessages} from "./error_messages";
import * as WebSocket from "ws";

export function questionRouter(websocket: WebSocket): Router {

  const dataDir = process.env.APP_DATA;

  const router = express.Router();
  router.use(bodyParser.json());

  router.post('/', (req, res) => {
    try {
      let record = req.body;
      if (!record.hasOwnProperty("q")) {
        throw new Error(ErrorMessages.QUESTION_NOT_PRESENT);
      }
      if (!record.hasOwnProperty("a")) {
        throw new Error(ErrorMessages.ANSWER_NOT_PRESENT);
      }

      let course = new CourseDB(res.locals["courseid"]);
      console.log("[QUESTION ROUTER] POST", record);
      course.add(record);

      websocket.send(JSON.stringify({message: "question added", data: record}));
    } catch (e) {
      if (e.message == ErrorMessages.QUESTION_NOT_PRESENT) {
        res.status(400).send({error: ErrorMessages.QUESTION_NOT_PRESENT});
      } else if (e.message == ErrorMessages.ANSWER_NOT_PRESENT) {
        res.status(400).send({error: ErrorMessages.ANSWER_NOT_PRESENT});
      } else {
        console.log(e.message);
        res.status(500).send({error: e.message});
      }
    }
  });


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

      websocket.send(JSON.stringify({message: "question updated", data: record}));
    } catch (e) {
      if (e.message == ErrorMessages.RECORD_NOT_FOUND) {
        res.status(404).send({error: ErrorMessages.RECORD_NOT_FOUND});
      } else if (e.message == ErrorMessages.QUESTION_NOT_PRESENT) {
        res.status(400).send({error: ErrorMessages.QUESTION_NOT_PRESENT});
      } else {
        console.log(e.message);
        res.status(500).send({error: e.message});
      }
    }
  });


  return router;
}