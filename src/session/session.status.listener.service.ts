import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ClientEntity } from 'src/client/entity/client.entity';
import { SGEmailService } from 'src/sendgrid/sendgrid.service';
import { SmsService } from 'src/sms/sms.service';
import { Repository } from 'typeorm';
import { SessionEntity } from './entity/session.entity';
import { MSGTYPE, SessionStatusEntity } from './entity/session.status.entity';
import { SessionStatusNotifiyEntity } from './entity/session.status.notify.entity';

@Injectable()
export class SessionStatusListener {
    constructor(
        @InjectRepository(SessionEntity)
        private sessionRepository: Repository<SessionEntity>,
        @InjectRepository(SessionStatusEntity)
        private sStatusRepository: Repository<SessionStatusEntity>,
        @InjectRepository(SessionStatusNotifiyEntity)
        private sStatusNotifyRepository: Repository<SessionStatusNotifiyEntity>,
        private smsSerivce: SmsService,
        private sgEmailService: SGEmailService,
    ) { }

    @OnEvent('session.status.changed')
    async handleOrderCreatedEvent(event: any) {
        const { sessionId, payload } = event;
        const sessionEnt = await this.sessionRepository.findOne({
            id: sessionId
        }, {
            relations: ['sessionStatus', 'account', 'clients', 'witnesses', 'sessionAssociateJoins', 'sessionAssociateJoins.associate']
        });

        sessionEnt.clients.map(async (client: ClientEntity) => {
            const sessionNotifiedMsgs = await Promise.all((await this.sStatusNotifyRepository.find({
                clientId: client.id,
                sessionStatus: payload?.newSessionStatus,
            })).map(async snMsg => await this.updateDeliverStatus(snMsg)));
            const isDelivered = sessionNotifiedMsgs.find(st => st.isDelivered)
            if (!isDelivered) {
                await this.handleSendSMSNotification({
                    clientId: client.id,
                    sessionStatus: payload?.newSessionStatus,
                    msgType: MSGTYPE.SMS
                }, client.phone, sessionEnt, payload)
                await this.handleSendEmailNotification({
                    clientId: client.id,
                    sessionStatus: payload?.newSessionStatus,
                    msgType: MSGTYPE.EMAIL
                }, client.email, sessionEnt, payload)
            }
        })
    }

    updateDeliverStatus = async (snMsg: SessionStatusNotifiyEntity) => {
        if (snMsg.msgType === MSGTYPE.EMAIL) {
            // TODO
            // update the email delivery status
            // const feedback = await this.sgEmailService.getFeedbackMsg(sessionToken.deliveryMessageSid)
        } else {
            const feedback = await this.smsSerivce.getFeedbackMsg(snMsg.deliveryMessageSid)
            if (feedback && feedback?.outcome === 'confirmed') {
                return await this.sStatusNotifyRepository.save(plainToClass(SessionStatusNotifiyEntity, {
                    ...snMsg,
                    deliveryStatus: 'confirmed',
                    isDelivered: true
                }))
            }
        }
        return snMsg;
    }

    handleSendSMSNotification = async (initalData: any, phoneNumber: string, session: SessionEntity, data: any) => {
        const res = await this.smsSerivce.sendSMS({
            to: phoneNumber,
            body: `Session #${session.hash}'s status is changed from ${data.oldSessionStatus.name}/${data.oldSessionStatus.status ? 'enabled' : 'disabled'} to ${data.newSessionStatus.name}/${data.newSessionStatus.status ? 'enabled' : 'disabled'}`
        })

        const oldSN = await this.sStatusNotifyRepository.findOne({
            ...initalData
        });
        await this.sStatusNotifyRepository.save(plainToClass(SessionStatusNotifiyEntity, {
            ...(oldSN ? oldSN : initalData),
            deliveryMessageSid: res.status?.sid,
            deliveryStatus: res.status?.status || '',
            isDelivered: res.status?.status === 'sent'
        }))
    }

    handleSendEmailNotification = async (initalData: any, email: string, session: SessionEntity, data: any) => {
        const res = await this.sgEmailService.sendEmailByTemplate({
            to: email,
            subject: `Session #${session.hash}'s status is changed`,
        })

        const oldSN = await this.sStatusNotifyRepository.findOne({
            ...initalData
        });
        await this.sStatusNotifyRepository.save(plainToClass(SessionStatusNotifiyEntity, {
            ...(oldSN ? oldSN : initalData),
            deliveryMessageSid: res?.headers['x-message-id'],
            deliveryStatus: 'Processed',
            isDelivered: false
        }))
    }
}