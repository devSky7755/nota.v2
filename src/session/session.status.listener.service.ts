import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { SGEmailService } from 'src/sendgrid/sendgrid.service';
import { SmsService } from 'src/sms/sms.service';
import { Repository } from 'typeorm';
import { SessionEntity } from './entity/session.entity';
import { SessionStatusEntity } from './entity/session.status.entity';

@Injectable()
export class SessionStatusListener {
    constructor(
        @InjectRepository(SessionEntity)
        private sessionRepository: Repository<SessionEntity>,
        @InjectRepository(SessionStatusEntity)
        private sStatusRepository: Repository<SessionStatusEntity>,
        private smsSerivce: SmsService,
        private sgEmailService: SGEmailService,
    ) { }

    @OnEvent('session.status.changed')
    async handleOrderCreatedEvent(event: any) {
        const { sessionId, payload } = event;
        const sessionEnt = await this.sessionRepository.findOne({
            id: sessionId
        }, {
            relations: ['sessionStatus']
        });
        const sessionStatus = await this.updateDeliverStatus(sessionEnt.sessionStatus)

        if (!sessionStatus?.notified) {
            // SEND 
        }
    }



    updateDeliverStatus = async (sessionStatus: SessionStatusEntity) => {
        let isNotified = false;
        // TODO
        // Check delivery status of email        
        // const emailFeedback = await this.sgEmailService.getFeedbackMsg(sessionStatus.emailSid)

        const smsFeedback = await this.smsSerivce.getFeedbackMsg(sessionStatus.smsSid)
        if (smsFeedback && smsFeedback?.outcome === 'confirmed') {
            isNotified = true;
        }
        if (isNotified) {
            return await this.sStatusRepository.save(plainToClass(SessionStatusEntity, {
                ...sessionStatus,
                notified: true
            }))
        }
        return sessionStatus;
    }
}