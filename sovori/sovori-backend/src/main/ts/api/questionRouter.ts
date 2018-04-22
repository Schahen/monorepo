import * as core from "express-serve-static-core";
import {Router} from "express-serve-static-core";
import * as express from 'express';
import * as path from 'path';
import {jsonResponse} from "./jsonResponse";
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as bodyParser from 'body-parser';
import {Course} from "./Course";
import * as shortid from "shortid";
import {ErrorMessages} from "./error_messages";


export function questionRouter(): Router {

  const dataDir = process.env.APP_DATA;

  const router = express.Router();
  router.use(bodyParser.json())

  router.get('/:id', (req, res) => {
    try {
      let data = new Course(res.locals["courseid"]).getValue(req.params.id);

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
      let course = new Course(res.locals["courseid"]);
    } catch (e) {
      if (e.message == ErrorMessages.RECORD_NOT_FOUND) {
        res.status(404).send({error: ErrorMessages.RECORD_NOT_FOUND});
      }
    }
  });



  return router;
}