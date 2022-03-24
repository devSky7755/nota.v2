import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateBillingDto } from "./dto/billing.create-dto";
import { UpdateBillingDto } from "./dto/billing.update-dto";

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
    @InjectRepository(BillingPaymentEntity)
    private billingPaymentRepository: Repository<BillingPaymentEntity>,
  ) { }

  async findAll(): Promise<BillingEntity[]> {
    return await this.billingRepository.find({ relations: ["account", "items", "payments"] });
  }

  async findBillingById(id: number): Promise<BillingEntity> {

    const selectedBilling: BillingEntity = await this.billingRepository.findOne({ id }, {
      relations: ["account", "items", "payments"]
    });
    if (!selectedBilling)
      throw new NotFoundException(`there is no Billing with ID ${id}`);
    return selectedBilling;
  }

  async createBilling(billing: CreateBillingDto): Promise<BillingEntity> {
    const { accountId, items, payments, ...dto } = billing;
    const account = await this.accountRepository.findOne({
      id: accountId,
    });
    const itemEnts = await this.billingItemRepository.save(items);
    const paymentEnts = await this.billingPaymentRepository.save(payments);

    return await this.billingRepository.save(plainToClass(BillingEntity, {
      ...dto,
      account,
      items: itemEnts,
      payments: paymentEnts
    }));
  }

  async updateBillingById(billingId: number, billingDto: UpdateBillingDto): Promise<BillingEntity> {
    const billing = await this.billingRepository.findOne(billingId);
    if (!billing)
      throw new NotFoundException(`there is no Billing with ID ${billingId}`);

    const { accountId, items, payments, ...dto } = billingDto;
    if (accountId) {
      dto['account'] = await this.accountRepository.findOne({
        id: accountId,
      });
    }
    if (items) {
      dto['items'] = await this.billingItemRepository.save(items);
    }
    if (payments) {
      dto['payments'] = await this.billingPaymentRepository.save(payments);
    }

    return await this.billingRepository.save(plainToClass(BillingEntity, {
      ...billing,
      ...dto
    }));
  }

  async removeBillingById(billingId: number): Promise<DeleteResult> {
    return await this.billingRepository.delete(billingId);
  }
}
