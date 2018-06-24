import { Request, Response } from 'express';
import foo from '../foo';

export const GET = (_: Request, res: Response) => {
  const message = foo();
  res.status(200).send({ message });
};
