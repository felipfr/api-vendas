import HandlebarsMailTemplate from './HandlebarsMailTemplate';
import mailConfig from '@config/mail/mail';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class SESMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();
    const sesClient = new SESClient({ region: 'us-east-1' });

    const { email, name } = mailConfig.defaults.from;
    const html = await mailTemplate.parse(templateData);

    const params = {
      Source: `${from?.name || name} <${from?.email || email}>`,
      Destination: {
        ToAddresses: [`${to.name} <${to.email}>`],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Html: {
            Data: html,
          },
        },
      },
    };

    try {
      const command = new SendEmailCommand(params);
      await sesClient.send(command);
    } catch (err) {
      console.error('Error sending email:', err);
      throw err;
    }
  }
}
