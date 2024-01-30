import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(title: string, body: string, email: string) {
    // const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Notes Update',
      template: './mailTemplate', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        title: title,
        body: body,
      },
    });
  }
}
