import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { BillingEntity } from "./entity/billing.entity";
import { BillingController } from "./billing.controller";
import { BillingService } from "./billing.service";

@Module({
  imports: [TypeOrmModule.forFeature([BillingEntity])],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
