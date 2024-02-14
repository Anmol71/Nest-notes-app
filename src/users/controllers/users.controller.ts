import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Redirect,
  Render,
  StreamableFile,
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
import { FormDataRequest } from 'nestjs-form-data';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { Storage } from '@squareboat/nest-storage';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //POST- For registration of user.
  @Render('thanksPage')
  @Post('register')
  public create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  //GET- For showing the registration page.
  @Render('register')
  @Get('register')
  public showRegister() {
    return {};
  }
  //GET- For showing the email updation page.
  @Render('updateEmail')
  @Get('email')
  public showEmailPage() {
    console.log('Show Email Page');
    return {};
  }
  //GET- For showing profile updation page.
  @Render('updateProfile')
  @UseGuards(AuthGuard)
  @Get('profile')
  public async showProfilePge(@AuthUser() authUser: UserModel) {
    return { user: authUser };
  }

  // @Get()
  // // @Redirect('/users')
  // // @Render('usersList')
  // public findAll() {
  //   console.log('Find All');
  //   const users = this.usersService.findAll();
  //   return users;
  // }

  //GET- To show the profile image in profile page.
  @UseGuards(AuthGuard)
  @Get('image')
  @Header('Content-Type', 'image/jpeg')
  @Header('Content-Type', 'image/png')
  @Header('Content-Disposition', 'inline')
  public async getFile(
    @AuthUser() authUser: UserModel,
  ): Promise<StreamableFile> {
    const user = authUser;
    const image = await Storage.disk('local').get(user.filename);
    const file = new StreamableFile(image);
    return file;
  }

  //GET- To find user on the basis of their unique id.
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  //POST- To add the profile image of user.
  @UseGuards(AuthGuard)
  @Redirect('/users/profile')
  @Post('image')
  @FormDataRequest()
  public async uploadFiles(
    @Body(ValidationPipe) updateProfileDto: UpdateProfileDto,
    //   // use a dto for file upload as mentioned in the nestjs-formdata package
    @AuthUser() authUser: UserModel,
  ) {
    // call the user service method to store the file
    await this.usersService.addImage(authUser, updateProfileDto);
  }

  //PATCH- To update the email of user.
  @UseGuards(AuthGuard)
  @Redirect('/users/email')
  @Patch('email')
  public async addEmail(
    @AuthUser()
    user: UserModel,
    @Body(ValidationPipe)
    updateEmailDto: UpdateEmailDto,
  ) {
    return this.usersService.addEmail(user, updateEmailDto);
  }

  // @UseGuards(AuthGuard)
  // @Redirect('/users/profile')
  // @Delete('image')
  // @FormDataRequest()
  // public async deleteFiles(@AuthUser() authUser: UserModel) {
  //   const user = await this.usersService.findOne(authUser.id);
  //   await Storage.disk('local').delete(user.filename);
  // }

  //DELETE- To delete the user.
  @Delete(':id')
  public remove(@AuthUser() user: UserModel) {
    return this.usersService.delete(user);
  }
}
