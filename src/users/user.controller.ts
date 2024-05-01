import { Request, Response, NextFunction } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error.class";
import { injectable, inject } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import 'reflect-metadata'
import { IUserController } from "./user.interface";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService)
    this.bindRoutes([
      {path: '/register', method: 'post', func: this.register},
      {path: '/login', method: 'post', func: this.login},
      {path: '/error', method: 'get', func: this.error}
    ])
  }

  login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'login')
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register')
  }

  error(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(500, 'error hah'));
  }
}
