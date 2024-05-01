import express, { Express } from "express"
import { Server } from "http"
import { injectable, inject } from "inversify"
import { TYPES } from "./types"
import { ILogger } from "./logger/logger.interface"
import { IException } from "./errors/exception.filter.interface"
import { UserController } from "./users/user.controller"
import 'reflect-metadata'

@injectable()
export class App {
  app: Express
  port: number
  server: Server

  constructor(@inject(TYPES.ILogger) private logger: ILogger, @inject(TYPES.UserController) private userController: UserController, @inject(TYPES.ExceptionFilter) private exceptionFilter: IException) {
    this.app = express()
    this.port = 8000
  }

  useRoutes() {
    this.app.use('/users', this.userController.router)
  }

  useExceptionFilter() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
  }

  public async init() {
    this.useRoutes()
    this.useExceptionFilter()
    this.server = this.app.listen(this.port)
    this.logger.log(`Server start on ${this.port}`)
  }
}
