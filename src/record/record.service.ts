import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { MethodEntity } from "src/method/entity/method.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { TypeEntity } from "src/type/entity/type.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Repository } from "typeorm";
import { CreateRecordDto } from "./dto/record.create-dto";
import { UpdateRecordDto } from "./dto/record.update-dto";
import { RecordEntity } from "./entity/record.entity";

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(RecordEntity)
    private recordRepository: Repository<RecordEntity>,
    @InjectRepository(StateEntity)
    private stateRepository: Repository<StateEntity>,
    @InjectRepository(TypeEntity)
    private typeRepository: Repository<TypeEntity>,
    @InjectRepository(MethodEntity)
    private methodRepository: Repository<MethodEntity>
  ) { }

  async createRecord(record: CreateRecordDto, user: UserEntity): Promise<RecordEntity> {
    const {
      typeOfNotarization,
      methodOfId,
      dlState,
      ...dto
    } = record;
    return await this.recordRepository.save({
      typeOfNotarization: await this.typeRepository.findOne({
        id: typeOfNotarization
      }),
      methodOfId: await this.methodRepository.findOne({
        id: methodOfId
      }),
      dlState: await this.stateRepository.findOne({
        id: dlState
      }),
      user,
      ...dto,
    });
  }

  async findAllRecord(): Promise<RecordEntity[]> {
    return await this.recordRepository.find();
  }

  async findRecordByUser(user: UserEntity): Promise<RecordEntity[]> {
    return await this.recordRepository.find({
      relations: ['user'],
      where: {
        user,
      }
    });
  }

  async findRecordById(recordId: number): Promise<RecordEntity> {
    return await this.recordRepository.findOne({
      relations: ['user'],
      where: {
        id: recordId
      }
    });
  }

  async updateRecordById(recordId: number, recordDto: UpdateRecordDto): Promise<RecordEntity> {
    const recordEntity = await this.recordRepository.findOne(recordId);
    if (!recordEntity)
      throw new NotFoundException(`there is no record with ID ${recordId}`);

    const {
      typeOfNotarization,
      methodOfId,
      dlState,
      ...dto
    } = recordDto;

    if (typeOfNotarization) {
      dto['typeOfNotarization'] = await this.typeRepository.findOne({ id: typeOfNotarization })
    }

    if (methodOfId) {
      dto['methodOfId'] = await this.methodRepository.findOne({ id: methodOfId })
    }

    if (dlState) {
      dto['dlState'] = await this.stateRepository.findOne({ id: dlState })
    }

    return await this.recordRepository.save(plainToClass(RecordEntity, { ...recordEntity, ...dto }));
  }

  async removeRecordById(recordId: number): Promise<RecordEntity> {
    const recordEntity = await this.recordRepository.findOne(recordId);
    if (!recordEntity)
      throw new NotFoundException(`there is no record with ID ${recordId}`);

    return await this.recordRepository.remove(recordEntity);
  }
}
