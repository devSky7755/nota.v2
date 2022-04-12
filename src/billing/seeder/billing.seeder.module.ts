import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BillingEntity } from "../entity/billing.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { BillingSeederService } from "./billing.seeder.service";
import { BillingStatusEntity } from "../entity/billing.status.entity";
import { BillingItemEntity } from "../entity/billing.item.entity";
import { BillingPaymentEntity } from "../entity/billing.payment.entity";
import { BillingNetAccountEntity } from "../entity/billing.net_account.entity";
import { AccountEntity } from "src/account/entity/account.entity";

const seederServices = [
  BillingSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([BillingEntity, BillingStatusEntity, BillingItemEntity, BillingPaymentEntity, BillingNetAccountEntity, AccountEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class BillingSeederModule { }
