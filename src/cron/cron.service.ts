import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name);
    constructor(private readonly sessionService: SessionService) { }

    @Interval(1000 * 60 * 60)
    async handleSessionTimeout() {
        await this.sessionService.checkSessionTimeout();
        this.logger.debug('Called every an hour to check if session started 24 hrs later.');
    }

    @Interval(1000 * 60 * 60)
    async sendVerifDigitPin() {
        await this.sessionService.sendVerifDigitPin();
        this.logger.debug('Called every an hour to send verif code started already');
    }
}