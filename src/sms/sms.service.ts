import { Injectable } from "@nestjs/common";
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
import { SmsSendDto } from "./dto/sms.send-dto";

@Injectable()
export class SmsService {
  constructor(
    @InjectTwilio() private readonly client: TwilioClient
  ) { }

  async sendSMS(sendDto: SmsSendDto): Promise<any> {
    try {
      console.log(process.env.TWILIO_SENDER_PHONE_NUMBER)
      return await this.client.messages.create({
        body: sendDto.body,
        // from: process.env.TWILIO_SENDER_PHONE_NUMBER,
        from: '+19725734889',
        to: sendDto.to,
      });
      return await this.client.availablePhoneNumbers('US')
        .mobile
        .list({ limit: 20 });
    } catch (e) {
      console.log(e)
      return e;
    }
  }
}
