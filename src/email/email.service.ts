import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserWelcome(user: User, token: string) {
    const confirmation_url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './welcome', // `.ejs` extension is appended automatically
      context: {
        // filling <%= %> brackets with content
        name: user.name,
        confirmation_url,
      },
    });
  }
}
