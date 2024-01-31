import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(
    title: string,
    body: string,
    emails: string | string[],
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: emails,
      subject: 'Notes Deleted',
      template: './mailTemplate', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        title: title,
        body: body,
      },
    });
  }
}
