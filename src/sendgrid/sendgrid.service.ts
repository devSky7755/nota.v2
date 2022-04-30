import { Injectable } from "@nestjs/common";
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import * as SendGrid from '@sendgrid/mail';
import { SGEmailSendDto } from "./dto/sendgrid.send-dto";
// import { join } from "path";
// const Email = require('email-templates');

@Injectable()
export class SGEmailService {
  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(sendDto: SGEmailSendDto): Promise<any> {
    // const email = new Email({
    //   message: {
    //     from: 'niftylettuce@gmail.com'
    //   },
    //   // uncomment below to send emails in development/test env:
    //   // send: true
    //   transport: {
    //     jsonTransport: true
    //   }
    // });
    // console.log(join(__dirname, '/email-templates/template-1'))
    // email
    //   .send({
    //     template: join(__dirname, 'email-templates/template-1'),
    //     message: {
    //       to: 'elon@spacex.com'
    //     },
    //     locals: {
    //       name: 'Elon'
    //     }
    //   })
    //   .then(console.log)
    //   .catch(console.error);

    try {
      const dto = {
        from: process.env.SENDGRID_FROM_EMAIL,
        template_id: process.env.SENDGRID_EMAIL_TEMPLATE_ID,
        personalizations: [{
          to: { email: sendDto.to },
          dynamic_template_data: {
          },
        }],
        // from: 'sea930320@hotmail.com',
        ...sendDto
      }
      const transport = await SendGrid.send(dto);
      // avoid this on production. use log instead :)
      console.log(`E-Mail sent to ${sendDto.to}`);
      return transport;
    } catch (e) {
      console.log(e)
      return e;
    }
  }
}
