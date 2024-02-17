import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Render,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  // @Render('createNotes')
  @Redirect('/notes/create')
  @Post('login')
  public async signIn(
    @Body(ValidationPipe) signInDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const token = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    response.cookie('Authorization', token);
    return;
  }

  @Post('logout')
  @Redirect('/auth/login')
  public async signOut(
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    response.cookie('Authorization', '');
  }

  @Render('index')
  @Get('login')
  public showLogin() {
    return {};
  }
}
