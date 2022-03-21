import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAuditDto } from "./dto/audit.create-dto";
import { AuditEntity } from "./entity/audit.entity";

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditEntity)
    private witnessRepository: Repository<AuditEntity>
  ) {}

  async createAudit(witness: CreateAuditDto): Promise<AuditEntity> {
    return await this.witnessRepository.save({
      ...witness,
    });
  }

  async findAllAudit(): Promise<AuditEntity[]> {
    return await this.witnessRepository.find();
  }

  async findAudit(witnessId: number): Promise<AuditEntity> {
    return await this.witnessRepository.findOne({ id: witnessId });
  }
}
