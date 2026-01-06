import nodemailer from 'nodemailer';
import { IMailProvider } from './IMailProvider';

export class EtherealMailProvider implements IMailProvider {
  async sendMail(to: string, subject: string, body: string, html: string): Promise<string> {
    // Cria conta de teste no Ethereal
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"DevStore" <noreply@devstore.com>',
      to,
      subject,
      text: body,
      html: html,
    });

    // Captura o link de visualização
    const previewUrl = nodemailer.getTestMessageUrl(info);
    
    return previewUrl || 'Link indisponível';
  }
}