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
      return await this.client.messages.create({
        body: sendDto.body,
        from: sendDto.from,
        to: sendDto.to,
      });
      return await this.client.availablePhoneNumbers('US')
        .mobile
        .list({ limit: 20 });
    } catch (e) {
      return e;
    }
  }
}
