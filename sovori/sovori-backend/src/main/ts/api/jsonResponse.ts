import {Response} from "express-serve-static-core";

export function jsonResponse(res: Response, content: any) {
  res.setHeader('Content-Type', 'application/json');
  res.send(content);
}