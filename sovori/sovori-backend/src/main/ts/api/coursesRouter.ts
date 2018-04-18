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

export function coursesRouter(): Router {

  const dataDir = process.env.APP_DATA;

  const router = express.Router();

  router.use(bodyParser.json())

  router.get('/:id', (req, res) => {
    const db = low(new FileSync(path.resolve(dataDir, `${req.params.id}.json`)));
    jsonResponse(res, db.get("data"));
  });

  router.post('/:id', (req, res) => {
    const db = low(new FileSync(path.resolve(dataDir, `${req.params.id}.json`)));
    if (Courses.validate(req.body)) {
      let record = req.body;
      db.get("data").push(record).write();
      jsonResponse(res, req.body);
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