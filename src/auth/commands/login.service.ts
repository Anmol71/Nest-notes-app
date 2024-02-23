import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Command, Positional } from 'nestjs-command';

@Injectable()
export class LoginService {
  constructor(private readonly authService: AuthService) {}

  @Command({
    command: 'login:user <username> <password>',
    describe: 'login a user',
  })
  async create(
    @Positional({
      name: 'username',
      describe: 'the username',
      type: 'string',
    })
    username: string,
    @Positional({
      name: 'password',
      describe: 'the password',
      type: 'string',
    })
    password: string,
  ) {
    console.log('logging in');
    const token = await this.authService.signIn(
      username,
      password,
      // email
    );
    console.log('token:   ', token);
  }
}
