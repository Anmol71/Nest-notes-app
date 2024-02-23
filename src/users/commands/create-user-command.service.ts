import { Injectable } from '@nestjs/common';
import { Command, Positional } from 'nestjs-command';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class CreateUserCommandService {
  constructor(private readonly userService: UsersService) {}

  @Command({
    command: 'create:user <username> <password>',
    describe: 'create a user',
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
    await this.userService.create({
      username,
      password,
      // email
    });
    console.log('User Created Succesfully');
  }
}
