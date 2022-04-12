import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToClass } from 'class-transformer';
import { CreateBillingDto } from "../dto/billing.create-dto";
import { BillingEntity } from "../entity/billing.entity";
import { seedBillings } from "./billing.seeder.data";
import { StateEntity } from "src/state/entity/state.entity";
import { AccountEntity } from "src/account/entity/account.entity";
import { BillingItemEntity } from "../entity/billing.item.entity";
import { BillingPaymentEntity } from "../entity/billing.payment.entity";
import { BillingNetAccountEntity } from "../entity/billing.net_account.entity";
import { BillingStatusEntity } from "../entity/billing.status.entity";

/**
 * Service dealing with billing based operations.
 *
 * @class
 */
@Injectable()
export class BillingSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<BillingEntity>} billingRepository
     */
    constructor(
        @InjectRepository(BillingEntity)
        private readonly billingRepository: Repository<BillingEntity>,
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
    /**
     * Seed all billings.
     *
     * @function
     */
    create(): Array<Promise<BillingEntity>> {
        return seedBillings.map(async (billing: CreateBillingDto) => {
            const { accountId, items, payments, netAccount, status, ...dto } = billing;
            const itemEnts = await this.billingItemRepository.save(items);
            const paymentEnts = await this.billingPaymentRepository.save(payments);
            return await this.billingRepository
                .save(plainToClass(BillingEntity, {
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
                })).then((billing: BillingEntity) => {
                    return Promise.resolve(
                        billing
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}