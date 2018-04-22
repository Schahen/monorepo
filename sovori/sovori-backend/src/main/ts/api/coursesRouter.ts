import {Router} from "express-serve-static-core";
import * as express from 'express';
import {jsonResponse} from "./jsonResponse";
import * as bodyParser from 'body-parser';
import {Courses} from "./Courses";
import {Course} from "./Course";
import {questionRouter} from "./questionRouter";
import {ErrorMessages} from "./error_messages";

export function coursesRouter(): Router {

  const router = express.Router();

  router.use(bodyParser.json());

  router.param('courseid', function(req, res, next, name) {
    res.locals['courseid'] = name;
    next();
  });

  router.use("/:courseid/record", questionRouter());

  router.get('/:courseid', (req, res) => {
    jsonResponse(res, new Course(req.params.courseid).all());
  });

  router.post('/:courseid', (req, res) => {
    let course = new Course(req.params.courseid);
    let record = req.body;
    try {
      jsonResponse(res, course.update(record));
    } catch (e) {
      if (e.message == ErrorMessages.INVALID_RECORD) {
        res.status(400).send({error: ErrorMessages.INVALID_RECORD});
      } else {
        res.status(500).send({error: e.message})
      }
    }
  });


  router.get('/', (req, res) => {
    jsonResponse(res, new Courses().get());
  });

  return router;
}