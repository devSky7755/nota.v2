import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entity/user.entity";
import { Repository } from "typeorm";
import { CreateBillingDto } from "./dto/billing.create-dto";
import { BillingEntity } from "./entity/billing.entity";

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(BillingEntity)
    private billingRepository: Repository<BillingEntity>
  ) {}

  async createBilling(billing: CreateBillingDto): Promise<BillingEntity> {
    return await this.billingRepository.save({
      ...billing,
    });
  }

  async findAllBilling(): Promise<BillingEntity[]> {
    return await this.billingRepository.find();
  }

  async findBilling(billingId: number): Promise<BillingEntity> {
    return await this.billingRepository.findOne({ id: billingId });
  }
}
