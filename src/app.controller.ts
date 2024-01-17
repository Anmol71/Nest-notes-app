import { Get, Controller, Render, Post, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  @Render('login')
  index() {
    return;
  }

  @Post('/login')
  login(@Res() res: Response): void {
    res.redirected('/home');
  }

  @Get('/home')
  @Render('home')
  getHome() {
    return;
  }

  @Get('/profile')
  @Render('profile')
  getProfile() {
    return;
  }

  @Get('/logout')
  logout(@Res() res: Response): void {
    res.redirect('/');
  }
}
