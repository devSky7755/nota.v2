import { Injectable } from "@nestjs/common";
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import * as SendGrid from '@sendgrid/mail';
import { SGEmailSendDto } from "./dto/sendgrid.send-dto";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs";
// import { join } from "path";
// const Email = require('email-templates');

@Injectable()
export class SGEmailService {
  constructor(private http: HttpService) {
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

  async getFeedbackMsg(mid: string): Promise<any> {
    if (!mid) return false;

    const requestConfig = {
      headers: {
        "authorization": `Bearer ${process.env.SENDGRID_API_KEY}`
      },
    };

    const responseData = await this.http.get('https://api.sendgrid.com/v3/messages?query=msg_id=' + mid, requestConfig).pipe(
      map((response) => {
        return response.data;
      }));
    console.log(responseData);
  }

  async initiateEmailVerification(email: string, digitPin: string): Promise<any> {
    if (!email || !digitPin) return;
    try {
      const dto = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL,
        templateId: process.env.SENDGRID_EMAIL_TEMPLATE_ID,
        dynamicTemplateData: {
          subject: 'Notar.io email verification',
          digitPin
        },
      }
      const transport = await SendGrid.send(dto);
      console.log(transport)
      console.log(`E-Mail sent to ${dto.to}`);
      return (transport?.length > 0 && transport[0]) || {};
    } catch (e) {
      console.log(e)
      return {};
    }
  }
}
