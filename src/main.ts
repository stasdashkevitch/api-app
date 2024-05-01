import { Container } from "inversify";
import { App } from "./app";
import { ExceptionFilter } from "./errors/exception.filter";
import { LoggerService } from "./logger/logger.service";
import { ILogger } from "./logger/logger.interface";
import { UserController } from "./users/user.controller";
import { TYPES } from "./types";
import { IException } from "./errors/exception.filter.interface";

const appContainer = new Container()
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService)
appContainer.bind<IException>(TYPES.ExceptionFilter).to(ExceptionFilter)
appContainer.bind<UserController>(TYPES.UserController).to(UserController)
appContainer.bind<App>(TYPES.Applicatoin).to(App)
const app = appContainer.get<App>(TYPES.Applicatoin)
app.init()

export {
  appContainer,
  app
}
