import { HttpException, Injectable } from "@nestjs/common";
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import * as SendGrid from '@sendgrid/mail';
import * as SendGridClient from '@sendgrid/client';
import { SGEmailSendDto } from "./dto/sendgrid.send-dto";
import { HttpService } from "@nestjs/axios";
import { catchError, lastValueFrom, map } from "rxjs";
// import { join } from "path";
// const Email = require('email-templates');

@Injectable()
export class SGEmailService {
  constructor(private http: HttpService) {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    SendGridClient.setApiKey(process.env.SENDGRID_API_KEY);
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

    // const requestConfig = {
    //   headers: {
    //     "authorization": `Bearer ${process.env.SENDGRID_API_KEY}`
    //   },
    // };

    // const responseData = await lastValueFrom(this.http.get('https://api.sendgrid.com/v3/messages?query=msg_id%3D%22' + mid + '%22', requestConfig).pipe(
    //   catchError(e => {
    //     console.log(e)
    //     throw new HttpException(e.response.data, e.response.status);
    //   }),
    //   map((response) => {
    //     console.log(response)
    //     return response.data;
    //   })))

    // const request = {
    //   url: `/v3/messages?query=msg_id%3D%22` + mid + '%22',
    //   method: 'GET',
    //   headers: {},
    //   qs: {
    //     "start_date": "2010-01-22"
    //   }
    // }

    // SendGridClient.request(request)
    //   .then(([response, body]) => {
    //     console.log(response.statusCode);
    //     console.log(response.body);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    // const queryParams = {
    //   "start_date": "2010-01-22"
    // };
    // const headers = {
    //   "on-behalf-of": "The subuser's username. This header generates the API call as if the subuser account was making the call."
    // };

    // const request = {
    //   url: `/v3/stats`,
    //   method: 'GET',
    //   headers: headers,
    //   qs: queryParams
    // }

    // SendGridClient.request(request as any)
    //   .then(([response, body]) => {
    //     console.log(response.statusCode);
    //     console.log(response.body);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
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
      // console.log(transport)
      console.log(`E-Mail sent to ${dto.to}`);
      return (transport?.length > 0 && transport[0]) || {};
    } catch (e) {
      console.log(e)
      return {};
    }
  }
}
