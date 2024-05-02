import { inject, injectable } from 'inversify';
import { IConfigService } from './config.service.interface';
import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      logger.error('[ConfigService] the .env file could not be read or is missing');
    } else {
      this.logger.log('[ConfigService] configuration .env loaded');
      this.config = result.parsed as DotenvParseOutput;
    }
  }
  get(key: string): string {
    return this.config[key];
  }
}
