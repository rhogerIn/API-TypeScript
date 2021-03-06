import nodemailer, { Transporter } from 'nodemailer';
import handlebars from "handlebars";
import fs from 'fs';

class SendMailServices{
  private client: Transporter
  constructor(){
    nodemailer.createTestAccount().then(account => {
      // Create a SMTP transporter object
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
          user: account.user,
          pass: account.pass
      }
    });

    this.client == transporter;
    })
  }
  /**
   * .then para respostas assincronas.
   * construtor não permite chamadas async
   */
  async execute(to: string, subject: string, variables: object, path: string){
      
    const templateFileContente = fs.readFileSync(path).toString("utf8");

    const mailTemplateParse = handlebars.compile(templateFileContente);
    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from:"NPS <noreply@nps.com.br>"
    })
    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailServices();