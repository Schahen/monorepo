import * as core from "express-serve-static-core";
import {Router} from "express-serve-static-core";
import * as express from 'express';

export function coursesRouter(): Router {

  const router = express.Router();

  router.use('/', (req, res) => {
    res.json({
      courses: [
        {id: "deutsch"}
      ]
    })
  });

  return router;
}