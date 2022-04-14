import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { AccountEntity } from "src/account/entity/account.entity";
import { AssociateEntity } from "src/associate/entity/associate.entity";
import { ClientEntity } from "src/client/entity/client.entity";
import { DocEntity } from "src/doc/entity/doc.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { WitnessEntity } from "src/witness/entity/witness.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateSessionDto } from "./dto/session.create-dto";
import { UpdateSessionDto } from "./dto/session.update-dto";
import { NotarySessionTypeEntity } from "./entity/notary.session.type.entity";
import { SessionAssociateJoinEntity } from "./entity/session.assoc.join.entity";
import { SessionEntity } from "./entity/session.entity";
import { SessionStatusEntity } from "./entity/session.status.entity";
import { SessionTypeEntity } from "./entity/session.types.entity";
import { v4 as uuid } from "uuid";
import { DurationEntity } from "src/duration/entity/duration.entity";
import { LessThan, MoreThan } from 'typeorm'

@Injectable()
export class SessionService {
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

  async findAllSessions(): Promise<SessionEntity[]> {
    return await this.sessionRepository.find({ relations: ["account", "user", "sessionType", "sessionStatus", "notarySessionType", "clients", "witnesses", "sessionAssociateJoins", "sessionAssociateJoins.associate", "sessionAssociateJoins.user", "docs"] });
  }

  async findSessionById(id: number): Promise<SessionEntity> {
    return await this.sessionRepository.findOne({ id }, { relations: ["account", "user", "sessionType", "sessionStatus", "notarySessionType", "clients", "witnesses", "sessionAssociateJoins", "sessionAssociateJoins.associate", "sessionAssociateJoins.user", "docs"] });
  }

  async createSession(session: CreateSessionDto): Promise<SessionEntity> {
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

    const sessionEnt = await this.sessionRepository.save({
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
    });
    await this.patchAssocitateRelations(sessionEnt, true, assocUserIds)
    await this.patchAssocitateRelations(sessionEnt, false, associateIds)

    return sessionEnt;
  }

  async updateSessionById(id: number, updateSessionDto: UpdateSessionDto): Promise<SessionEntity> {
    const session = await this.sessionRepository.findOne(id);
    if (!session)
      throw new NotFoundException(`there is no Session with ID ${id}`);

    const {
      account,
      user,
      duration,
      sessionType,
      sessionStatus,
      notarySessionType,
      clientIds,
      witnessIds,
      associateIds,
      assocUserIds,
      docIds,
      ...dto
    } = updateSessionDto;

    if (account) {
      dto['account'] = await this.accountRepository.findOne({
        id: account,
      });
    }

    if (user) {
      dto['user'] = await this.userRepository.findOne({
        id: user,
      });
    }

    if (duration) {
      dto['duration'] = await this.durationRepository.findOne({
        id: duration,
      });
    }

    if (sessionType) {
      dto['sessionType'] = await this.sTypeRepository.findOne({
        id: sessionType,
      });
    }

    if (sessionStatus) {
      dto['sessionStatus'] = await this.sStatusRepository.findOne({
        id: sessionStatus,
      });
    }

    if (notarySessionType) {
      dto['notarySessionType'] = await this.nSessionTypeRepository.findOne({
        id: notarySessionType,
      });
    }

    if (clientIds) {
      dto['clients'] = await this.clientRepository.findByIds(clientIds || []);
    }

    if (witnessIds) {
      dto['witnesses'] = await this.witnessRepository.findByIds(witnessIds || []);
    }

    if (associateIds) {
      await this.patchAssocitateRelations(session, false, associateIds)
    }

    if (assocUserIds) {
      await this.patchAssocitateRelations(session, true, assocUserIds)
    }

    if (docIds) {
      dto['docs'] = await this.docRepository.findByIds(docIds || []);
    }

    return await this.sessionRepository.save(plainToClass(SessionEntity, { ...session, ...dto }));
  }

  async removeSessionById(id: number): Promise<SessionEntity> {
    const session = await this.sessionRepository.findOne(id);
    if (!session)
      throw new NotFoundException(`there is no Session with ID ${id}`);

    return await this.sessionRepository.remove(session);
  }

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

  checkSessionTimeout = async () => {
    const hrs24Before = Date.now() - (24 * 60 * 60 * 1000);
    const sessions: SessionEntity[] = await this.sessionRepository.find({
      relations: ['sessionStatus'],
      where: {
        sessionStatus: {
          status: true
        },
        dateTime: LessThan(hrs24Before)
      }
    });

    sessions.forEach(async (session) => {
      await this.sStatusRepository.save(plainToClass(SessionStatusEntity, {
        ...session.sessionStatus,
        status: false,
      }))
    })
  }
}
