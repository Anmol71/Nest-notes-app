import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Redirect,
  Render,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateEmailDto } from '../dtos/update-email.dto';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { UserModel } from 'src/databases/models/user.model';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Render('thanksPage')
  @Post('register')
  public create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Render('register')
  @Get('register')
  public showRegister() {
    return {};
  }

  @Render('updateEmail')
  @Get('email')
  public showEmailPage() {
    console.log('Show Email Page');
    return {};
  }

  @Get()
  // @Redirect('/users')
  // @Render('usersList')
  public findAll() {
    console.log('Find All');
    const users = this.usersService.findAll();
    return users;
  }
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //     return this.usersService.update(+id, updateUserDto);
  //   }

  @UseGuards(AuthGuard)
  @Redirect('/users/email')
  @Patch('email')
  public async addEmail(
    @AuthUser()
    user: UserModel,
    @Body(ValidationPipe)
    updateEmailDto: UpdateEmailDto,
  ) {
    console.log('Email route running');
    console.log('my user', user);
    return this.usersService.addEmail(user, updateEmailDto);
  }

  @Delete(':id')
  public remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
