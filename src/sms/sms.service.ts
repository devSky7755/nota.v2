import { Injectable } from "@nestjs/common";
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { SessionEntity } from "src/session/entity/session.entity";
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
        from: process.env.TWILIO_SENDER_PHONE_NUMBER,
        to: sendDto.to,
      });
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
    return feedback;
  }

  async initiatePhoneNumberVerification(phoneNumber: string, digitPin: string, session: SessionEntity): Promise<any> {
    if (!phoneNumber || !digitPin) return;
    // TODO Create Session Link of UI and payload it on body
    const status = await this.client.messages.create({
      body: digitPin,
      from: process.env.TWILIO_SENDER_PHONE_NUMBER,
      to: phoneNumber,
      provideFeedback: true,
    });
    return {
      status,
      digitPin
    }
  }
}
