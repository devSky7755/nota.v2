import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAuditDto } from "./dto/audit.create-dto";
import { AuditEntity } from "./entity/audit.entity";
import { AccountEntity } from "src/account/entity/account.entity";

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditEntity)
    private auditRepository: Repository<AuditEntity>,
    @InjectRepository(AccountEntity)
    private AccountRepository: Repository<AccountEntity>,
  ) { }

  async createAudit(auditDto: CreateAuditDto): Promise<AuditEntity> {
    const { accountId, ...dto } = auditDto;

    return await this.auditRepository.save({
      account: await this.AccountRepository.findOne({
        id: accountId,
      }),

      ...dto,
    });
  }

  async findAllAudit(): Promise<AuditEntity[]> {
    return await this.auditRepository.find();
  }

  async findAudit(auditId: number): Promise<AuditEntity> {
    return await this.auditRepository.findOne({ id: auditId });
  }
}
