import { Injectable } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Command, Option } from 'nestjs-command';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class DeleteUserCommandService {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Command({
    command: 'delete:user',
    describe: 'delete a user',
  })
  async delete(
    @Option({
      name: 'token',
      describe: 'the token',
      type: 'string',
      alias: 't',
      required: true,
    })
    token: string,
  ) {
    const user = await this.authService.getUserFromToken(token);
    console.log('user to be delete: ', user.username);
    await this.userService.delete(user);
  }
}
