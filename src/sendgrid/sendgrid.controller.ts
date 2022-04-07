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
import { SGEmailSendDto } from "./dto/sendgrid.send-dto";
import { SGEmailService } from './sendgrid.service';

@Controller('email')
export class SGEmailController {
    constructor(private readonly sgEmailService: SGEmailService) { }

    @Post("/send")
    @UseGuards(AuthGuard("jwt"))
    sendSGEmail(@Body() sendDto: SGEmailSendDto): Promise<any> {
        return this.sgEmailService.sendEmail(sendDto);
    }
}
