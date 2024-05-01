import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { injectable } from 'inversify';

@injectable()
export class UserService implements IUserService {
  async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(name, email);
    await newUser.setPassword(password);
    return newUser;
  }

  async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
    return true;
  }
}
