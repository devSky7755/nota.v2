import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { BillingEntity } from "./entity/billing.entity";
import { BillingController } from "./billing.controller";
import { BillingService } from "./billing.service";
import { BillingItemEntity } from "./entity/billing.item.entity";
import { BillingPaymentEntity } from "./entity/billing.payment.entity";
import { AccountEntity } from "src/account/entity/account.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([BillingEntity, BillingItemEntity, BillingPaymentEntity, AccountEntity]),
  ],
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingService],
})
export class BillingModule { }
