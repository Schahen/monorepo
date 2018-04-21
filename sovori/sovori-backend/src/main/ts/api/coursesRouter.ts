import * as core from "express-serve-static-core";
import {Router} from "express-serve-static-core";
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import {jsonResponse} from "./jsonResponse";
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as bodyParser from 'body-parser';
import {Courses} from "./Courses";
import * as shortid from "shortid";
import {questionRouter} from "./questionRouter";

export function coursesRouter(): Router {

  const dataDir = process.env.APP_DATA;

  const router = express.Router();

  router.use(bodyParser.json());

  router.use("/:courseid/record", questionRouter());


  router.get('/:courseid', (req, res) => {
    const db = low(new FileSync(path.resolve(dataDir, `${req.params.courseid}.json`)));
    jsonResponse(res, db.get("data"));
  });

  router.post('/:courseid', (req, res) => {
    const db = low(new FileSync(path.resolve(dataDir, `${req.params.courseid}.json`)));
    if (Courses.validate(req.body)) {
      let record = req.body;
      record.id = shortid.generate();
      db.get("data").push(record).write();
      jsonResponse(res, record);
    } else {
      res.status(400).send({error: "bad record"})
    }
  });


  router.get('/', (req, res) => {
    const db = low(new FileSync(path.resolve(dataDir, "courses.json")));
    jsonResponse(res, db.get("data"));
  });

  return router;
}