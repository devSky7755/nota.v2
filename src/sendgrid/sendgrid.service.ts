import { Injectable } from "@nestjs/common";
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import * as SendGrid from '@sendgrid/mail';
import { SGEmailSendDto } from "./dto/sendgrid.send-dto";

@Injectable()
export class SGEmailService {
  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(sendDto: SGEmailSendDto): Promise<any> {
    try {
      const dto = {
        // from: process.env.SENDGRID_FROM_EMAIL,
        from: 'sea930320@hotmail.com',
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
