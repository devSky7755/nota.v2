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
import { BillingNetAccountEntity } from "./entity/billing.net_account.entity";
import { BillingStatusEntity } from "./entity/billing.status.entity";

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
    @InjectRepository(BillingNetAccountEntity)
    private billingNARepository: Repository<BillingNetAccountEntity>,
    @InjectRepository(BillingStatusEntity)
    private billingStatusRepository: Repository<BillingStatusEntity>,
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
    const { accountId, items, payments, netAccount, status, ...dto } = billing;

    try {
      const itemEnts = await this.billingItemRepository.save(items);
      const paymentEnts = await this.billingPaymentRepository.save(payments);

      return await this.billingRepository.save(plainToClass(BillingEntity, {
        ...dto,
        status: await this.billingStatusRepository.findOne({ id: status }),
        account: await this.accountRepository.findOne({
          id: accountId,
        }),
        netAccount: await this.billingNARepository.findOne({
          id: netAccount,
        }),
        items: itemEnts,
        payments: paymentEnts
      }));
    } catch (error) {
      throw error;
    }
  }

  async updateBillingById(billingId: number, billingDto: UpdateBillingDto): Promise<BillingEntity> {
    const billing = await this.billingRepository.findOne(billingId);
    if (!billing)
      throw new NotFoundException(`there is no Billing with ID ${billingId}`);

    const { accountId, items, payments, netAccount, status, ...dto } = billingDto;
    if (accountId) {
      dto['account'] = await this.accountRepository.findOne({
        id: accountId,
      });
    }
    if (netAccount) {
      dto['netAccount'] = await this.billingNARepository.findOne({
        id: netAccount,
      });
    }
    if (status) {
      dto['status'] = await this.billingStatusRepository.findOne({
        id: status,
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

  async removeBillingById(billingId: number): Promise<BillingEntity> {
    const billing = await this.billingRepository.findOne(billingId);
    if (!billing)
      throw new NotFoundException(`there is no Billing with ID ${billingId}`);
    return await this.billingRepository.remove(billing);
  }

  async findAllBillingNAs(): Promise<BillingNetAccountEntity[]> {
    return await this.billingNARepository.find();
  }

  async findBillingNAById(id: number): Promise<BillingNetAccountEntity> {

    const selectedBillingNA: BillingNetAccountEntity = await this.billingNARepository.findOne({ id });
    if (!selectedBillingNA)
      throw new NotFoundException(`there is no Billing NA with ID ${id}`);
    return selectedBillingNA;
  }
}
