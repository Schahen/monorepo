import * as core from "express-serve-static-core";
import {Router} from "express-serve-static-core";
import * as express from 'express';
import * as path from 'path';
import {jsonResponse} from "./jsonResponse";
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as bodyParser from 'body-parser';
import {Courses} from "./Courses";
import * as shortid from "shortid";


export function questionRouter(): Router {

  const dataDir = process.env.APP_DATA;

  const router = express.Router();
  router.use(bodyParser.json())

  router.get('/:id', (req, res) => {
    jsonResponse(res, {
      cid: req.params.courseid,
      id: req.params.id,
    });
  });


  return router;
}