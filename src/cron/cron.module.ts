import { Module } from '@nestjs/common';
import { SessionModule } from 'src/session/session.module';
import { CronService } from './cron.service';

@Module({
    providers: [CronService],
    imports: [SessionModule]
})
export class CronModule { }