import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBillingDto } from "./dto/billing.create-dto";

import { AccountEntity } from "src/account/entity/account.entity";
import { BillingEntity } from "./entity/billing.entity";
import { BillingItemEntity } from "./entity/billing.item.entity";
import { BillingPaymentEntity } from "./entity/billing.payment.entity";
import { plainToClass } from "class-transformer";

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(BillingEntity)
    private billingRepository: Repository<BillingEntity>,
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    @InjectRepository(BillingItemEntity)
    private billingItemRepository: Repository<BillingItemEntity>,
    @InjectRepository(AccountEntity)
    private billingPaymentRepository: Repository<BillingPaymentEntity>,
  ) { }

  async createBilling(billing: CreateBillingDto): Promise<BillingEntity> {
    const { accountId, items, payments, ...dto } = billing;
    const account = await this.accountRepository.findOne({
      id: accountId,
    });
    const itemEnts: BillingItemEntity[] = await this.billingItemRepository.findByIds(items);
    const paymentEnts: BillingPaymentEntity[] = await this.billingPaymentRepository.findByIds(payments);
    return await this.billingRepository.save(plainToClass(BillingEntity, {
      account,
      items: itemEnts,
      payments: paymentEnts,
      ...dto
    }));
  }

  async findAllBilling(): Promise<BillingEntity[]> {
    return await this.billingRepository.find();
  }

  async findBilling(billingId: number): Promise<BillingEntity> {
    return await this.billingRepository.findOne({ id: billingId });
  }
}
