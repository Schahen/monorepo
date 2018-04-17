import * as core from "express-serve-static-core";
import {Router} from "express-serve-static-core";
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

export function coursesRouter(): Router {

  const dataDir = process.env.APP_DATA;

  const router = express.Router();

  router.use('/:id', (req, res) => {
    const content = fs.readFileSync(path.resolve(dataDir, `${req.params.id}.json`), 'utf8');

    res.setHeader('Content-Type', 'application/json');
    res.send(content);
  });

  router.use('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send({
      courses: [
        {id: "deutsch"}
      ]
    })
  });

  return router;
}