import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entity/user.entity";
import { Repository } from "typeorm";
import { CreateRecordDto } from "./dto/record.create-dto";
import { RecordEntity } from "./entity/record.entity";

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(RecordEntity)
    private recordRepository: Repository<RecordEntity>
  ) {}

  async createRecord(record: CreateRecordDto): Promise<RecordEntity> {
    return await this.recordRepository.save({
      ...record,
    });
  }

  async findAllRecord(): Promise<RecordEntity[]> {
    return await this.recordRepository.find();
  }

  async findLoginedAllRecord(user: UserEntity): Promise<RecordEntity[]> {
    return await this.recordRepository.find({ user });
  }

  async findRecord(recordId: number): Promise<RecordEntity> {
    return await this.recordRepository.findOne({ id: recordId });
  }
}
