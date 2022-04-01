import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { BillingEntity } from "./entity/billing.entity";
import { BillingController, BillingNetAccountController } from "./billing.controller";
import { BillingService } from "./billing.service";
import { BillingItemEntity } from "./entity/billing.item.entity";
import { BillingPaymentEntity } from "./entity/billing.payment.entity";
import { BillingNetAccountEntity } from "./entity/billing.net_account.entity";
import { AccountEntity } from "src/account/entity/account.entity";
import { BillingStatusEntity } from "./entity/billing.status.entity";
import { BillingSubscriber } from "./billing.subscriber";

@Module({
  imports: [
    TypeOrmModule.forFeature([BillingEntity, BillingStatusEntity, BillingItemEntity, BillingPaymentEntity, BillingNetAccountEntity, AccountEntity]),
  ],
  controllers: [BillingController, BillingNetAccountController],
  providers: [BillingService, BillingSubscriber],
  exports: [BillingService],
})
export class BillingModule { }
