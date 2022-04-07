import {
    Body,
    Controller,
    Post,
    UseGuards,
    Request,
    Get,
    Param,
    Put,
    Delete,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SmsSendDto } from "./dto/sms.send-dto";
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
    constructor(private readonly smsService: SmsService) { }

    @Post("/send")
    @UseGuards(AuthGuard("jwt"))
    sendSms(@Body() sendDto: SmsSendDto): Promise<any> {
        return this.smsService.sendSMS(sendDto);
    }
}
