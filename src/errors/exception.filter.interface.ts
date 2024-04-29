import { Response, Request, NextFunction } from "express"

export interface IException {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
