import {Response} from "express-serve-static-core";

export function jsonResponse<T>(res: Response, content: T) {
  res.setHeader('Content-Type', 'application/json');
  res.send(content);
}