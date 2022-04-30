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
    try {
      const dto = {
        from: process.env.SENDGRID_FROM_EMAIL,
        template_id: process.env.SENDGRID_EMAIL_TEMPLATE_ID,
        personalizations: [{
          to: { email: sendDto.to },
          dynamic_template_data: {
          },
        }],
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
