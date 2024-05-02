import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { inject, injectable } from 'inversify';

@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}
  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(name, email);
    const salt = this.configService.get('SALT');
    await newUser.setPassword(password, Number(salt));
    return newUser;
  }

  async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
    return true;
  }
}
