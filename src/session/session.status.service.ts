import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { plainToClass } from "class-transformer";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { SessionStatusEntity } from "./entity/session.status.entity";
import { CreateSessionStatusDto } from "./dto/session.status.create-dto";
import { UpdateSessionStatusDto } from "./dto/session.status.update-dto";
import { SessionEntity } from "./entity/session.entity";

@Injectable()
export class SessionStatusService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
    @InjectRepository(SessionStatusEntity)
    private sStatusRepository: Repository<SessionStatusEntity>,
    private eventEmitter: EventEmitter2,
  ) { }

  async findAll(): Promise<SessionStatusEntity[]> {
    return await this.sStatusRepository.find();
  }

  async findById(id: number): Promise<SessionStatusEntity> {
    return await this.sStatusRepository.findOne({ id });
  }

  async createSessionStatus(sStatus: CreateSessionStatusDto): Promise<SessionStatusEntity> {
    return await this.sStatusRepository.save({
      ...sStatus,
    });
  }

  async updateSessionStatusById(id: number, sStatus: UpdateSessionStatusDto): Promise<SessionStatusEntity> {
    const sessionStatus = await this.sStatusRepository.findOne(id);
    if (!sessionStatus)
      throw new NotFoundException(`there is no session status with ID ${id}`);

    return await this.sStatusRepository.save(plainToClass(SessionStatusEntity, { ...sessionStatus, ...sStatus }));
  }

  async updateBySessionId(sessionId: number, sessionStatus: CreateSessionStatusDto): Promise<SessionEntity> {
    const sessionEnt = await this.sessionRepository.findOne({
      id: sessionId
    }, {
      relations: ['sessionStatus']
    });
    if (!sessionEnt)
      throw new NotFoundException(`there is no Session with ID ${sessionId}`);
    const oldSessionStatus = { ...sessionEnt.sessionStatus };
    sessionEnt.sessionStatus = await this.sStatusRepository.save({
      ...sessionStatus
    })

    const event = {
      sessionId,
      payload: {
        oldSessionStatus,
        newSessionStatus: sessionEnt.sessionStatus
      },
    };
    this.eventEmitter.emit(
      'session.status.changed',
      event
    );

    const newSession = await this.sessionRepository.save(plainToClass(SessionEntity, { ...sessionEnt }));
    oldSessionStatus?.id && await this.removeSessionStatusById(oldSessionStatus?.id)
    return newSession;
  }

  async removeSessionStatusById(id: number): Promise<SessionStatusEntity> {
    const sessionStatus = await this.sStatusRepository.findOne(id);
    if (!sessionStatus)
      throw new NotFoundException(`there is no session status with ID ${id}`);

    return await this.sStatusRepository.remove(sessionStatus);
  }
}
