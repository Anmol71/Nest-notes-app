import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signIn(username, pass) {
    console.log(username);
    console.log('Inside SignIN');
    const user = await this.usersService.findByUserName(username);
    console.log(user);
    console.log(await this.usersService.findAll());
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
