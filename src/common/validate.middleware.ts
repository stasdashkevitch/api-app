import { NextFunction, Request, Response } from 'express-serve-static-core';
import { IMiddlware } from './middlware.interface';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddlware {
  constructor(private classsToValidate: ClassConstructor<object>) {}
  execute({ body }: Request, res: Response, next: NextFunction): void {
    const instance = plainToClass(this.classsToValidate, body);
    validate(instance).then((errors) => {
      if (errors.length > 0) {
        res.status(422).send(errors);
      } else {
        next();
      }
    });
  }
}
