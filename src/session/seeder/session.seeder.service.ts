import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSessionDto } from "../dto/session.create-dto";
import { seedSessions, seedSessionStatuses } from "./session.seeder.data";
import { SessionEntity } from "src/session/entity/session.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { AccountEntity } from "src/account/entity/account.entity";
import { DurationEntity } from "src/duration/entity/duration.entity";
import { SessionTypeEntity } from "../entity/session.types.entity";
import { SessionStatusEntity } from "../entity/session.status.entity";
import { NotarySessionTypeEntity } from "../entity/notary.session.type.entity";
import { ClientEntity } from "src/client/entity/client.entity";
import { WitnessEntity } from "src/witness/entity/witness.entity";
import { AssociateEntity } from "src/associate/entity/associate.entity";
import { DocEntity } from "src/doc/entity/doc.entity";
import { SessionAssociateJoinEntity } from "../entity/session.assoc.join.entity";
import { v4 as uuid } from "uuid";

/**
 * Service dealing with session based operations.
 *
 * @class
 */
@Injectable()
export class SessionSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<SessionEntity>} sessionRepository
     */
    constructor(
        @InjectRepository(SessionEntity)
        private sessionRepository: Repository<SessionEntity>,
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(DurationEntity)
        private durationRepository: Repository<DurationEntity>,
        @InjectRepository(SessionTypeEntity)
        private sTypeRepository: Repository<SessionTypeEntity>,
        @InjectRepository(SessionStatusEntity)
        private sStatusRepository: Repository<SessionStatusEntity>,
        @InjectRepository(NotarySessionTypeEntity)
        private nSessionTypeRepository: Repository<NotarySessionTypeEntity>,
        @InjectRepository(ClientEntity)
        private clientRepository: Repository<ClientEntity>,
        @InjectRepository(WitnessEntity)
        private witnessRepository: Repository<WitnessEntity>,
        @InjectRepository(AssociateEntity)
        private associateRepository: Repository<AssociateEntity>,
        @InjectRepository(DocEntity)
        private docRepository: Repository<DocEntity>,
        @InjectRepository(SessionAssociateJoinEntity)
        private sajRepository: Repository<SessionAssociateJoinEntity>,
    ) { }

    async patchAssocitateRelations(session: SessionEntity, isUser: boolean, ids: Array<number>) {
        if (isUser) {
            (ids || []).map(async (id) => {
                const user = await this.userRepository.findOne(id);
                if (user) {
                    await this.sajRepository.save({
                        isUser,
                        session,
                        user,
                    });
                }
            });
        }
        else {
            (ids || []).map(async (id) => {
                const associate = await this.associateRepository.findOne(id);
                if (associate) {
                    await this.sajRepository.save({
                        isUser,
                        session,
                        associate,
                    });
                }
            });
        }
    }

    createSessionStatus(): Array<Promise<SessionStatusEntity>> {
        return seedSessionStatuses.map(async (status: any) => {
            return await this.sStatusRepository
                .findOne({ name: status.name })
                .then(async dbStatus => {
                    // We check if a session already exists.
                    // If it does don't create a new one.
                    if (dbStatus) {
                        return Promise.resolve(null);
                    }
                    return Promise.resolve(
                        await this.sStatusRepository.save(status)
                    )
                })
                .catch(error => Promise.reject(error));
        });
    }

    /**
     * Seed all sessions.
     *
     * @function
     */
    create(): Array<Promise<SessionEntity>> {
        return seedSessions.map(async (session: CreateSessionDto) => {
            return await this.sessionRepository
                .findOne({ caseMatterNum: session.caseMatterNum })
                .then(async dbSession => {
                    // We check if a session already exists.
                    // If it does don't create a new one.
                    if (dbSession) {
                        return Promise.resolve(null);
                    }
                    const {
                        account,
                        user,
                        duration,
                        dateTime,
                        sessionType,
                        sessionStatus,
                        notarySessionType,
                        clientIds,
                        witnessIds,
                        associateIds,
                        assocUserIds,
                        docIds,
                        ...dto
                    } = session;

                    const sAccount = await this.accountRepository.findOne({
                        id: account,
                    }, {
                        relations: ['timezone'],
                    });
                    let calcDateTime = parseInt(dateTime);
                    if (sAccount) {
                        calcDateTime -= sAccount.timezone.offset * 60 * 60 * 1000;
                    }
                    return await this.sessionRepository.save({
                        hash: uuid(),
                        account: sAccount,
                        dateTime: `${calcDateTime}`,
                        user: await this.userRepository.findOne({
                            id: user,
                        }),
                        duration: await this.durationRepository.findOne({
                            id: duration,
                        }),
                        sessionType: await this.sTypeRepository.findOne({
                            id: sessionType,
                        }),
                        sessionStatus: await this.sStatusRepository.findOne({
                            id: sessionStatus,
                        }),
                        notarySessionType: await this.nSessionTypeRepository.findOne({
                            id: notarySessionType,
                        }),
                        clients: await this.clientRepository.findByIds(clientIds || []),
                        witnesses: await this.witnessRepository.findByIds(witnessIds || []),
                        docs: await this.docRepository.findByIds(docIds || []),
                        ...dto
                    }).then(async resSession => {
                        await this.patchAssocitateRelations(resSession, true, assocUserIds)
                        await this.patchAssocitateRelations(resSession, false, associateIds)
                        return Promise.resolve(resSession)
                    }).catch(error => Promise.reject(error));
                })
                .catch(error => Promise.reject(error));
        });
    }
}