import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/databases/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signIn(username: string, pass: string) {
    const user: UserModel = await this.usersService.findByUserName(username);
    if (!user) {
      throw new NotFoundException();
    }
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { user_id: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
