import { NextFunction, Request, Response } from 'express';

export function allowCors(req: Request, res: Response, next: NextFunction): void {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Expose-Headers', 'X-Token');

  if (req.method === 'OPTIONS') {

    res.status(200).send();
    return;
  }

  next();
}