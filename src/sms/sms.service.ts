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
        from: process.env.TWILIO_SENDER_PHONE_NUMBER,
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

  async getFeedbackMsg(sid: string): Promise<any> {
    if (!sid) return false;
    const feedback = await this.client
      .messages(sid)
      .feedback.create({
        outcome: 'confirmed',
      });
    console.log(feedback);
    return feedback;
  }

  async initiatePhoneNumberVerification(phoneNumber: string, digitPin: string): Promise<any> {
    if (!phoneNumber || !digitPin) return;
    const status = await this.client.messages.create({
      body: digitPin,
      from: process.env.TWILIO_SENDER_PHONE_NUMBER,
      to: phoneNumber,
      provideFeedback: true,
    });
    console.log(status)
    return {
      status,
      digitPin
    }
  }
}
