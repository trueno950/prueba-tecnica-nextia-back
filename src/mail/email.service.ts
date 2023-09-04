import { MailerOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Mail } from './resources/interfaces/mail.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
@Injectable()
export class EmailService {
  private _mailService: MailerService;

  constructor() {
    const mailerOptions: MailerOptions = {
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'nextiaprueba@gmail.com',
          pass: 'qikldgvenhemavoq',
        },
      },
      defaults: {
        from: 'no-reply@prueba.com',
      },
      template: {
        dir: process.cwd() + '/dist/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };

    this._mailService = new MailerService(mailerOptions, undefined);
  }

  async sendByTemplate(mail: Mail) {
    console.log(
      'sendByTemplate',
      mail,
      process.cwd() + '/dist/templates',
      process.cwd(),
    );
    await this._mailService.sendMail({
      to: mail.to,
      subject: mail.subject,
      template: mail.templateId,
      context: {
        mail: mail,
      },
    });
  }
}
