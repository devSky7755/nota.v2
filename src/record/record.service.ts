import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entity/user.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateRecordDto } from "./dto/record.create-dto";
import { UpdateRecordDto } from "./dto/record.update-dto";
import { RecordEntity } from "./entity/record.entity";

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(RecordEntity)
    private recordRepository: Repository<RecordEntity>
  ) { }

  async createRecord(record: CreateRecordDto, user: UserEntity): Promise<RecordEntity> {
    return await this.recordRepository.save({
      ...record,
      user
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

  async updateRecordById(recordId: number, record: UpdateRecordDto): Promise<UpdateResult> {
    return await this.recordRepository.update({
      id: recordId
    }, record);
  }

  async removeRecordById(recordId: number): Promise<DeleteResult> {
    return await this.recordRepository.delete({
      id: recordId
    });
  }
}
