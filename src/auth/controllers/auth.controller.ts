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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Redirect('/notes')
  @Post('login')
  public async signIn(
    @Body(ValidationPipe) signInDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    response.cookie('Authorization', token);
    // response.redirect('/notes');
    return;
  }

  @Render('index')
  @Get('login')
  public showLogin() {
    return {};
  }
}
