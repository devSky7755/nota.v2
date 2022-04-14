import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountController } from "./account.controller";
import { AccountEntity } from "./entity/account.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { AccTypeEntity } from "src/acc_type/entity/acc_type.entity";
import { AccountService } from "./account.service";
import { AuthModule } from "src/auth/auth.module";
import { AccountStatusEntity } from "./entity/account.status.entity";
import { AccountSubscriber } from "./account.subscriber";
import { TimezoneEntity } from "src/timezone/entity/timezone.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, StateEntity, AccTypeEntity, AccountStatusEntity, TimezoneEntity]),
    forwardRef(() => AuthModule),
  ],
  providers: [AccountService, AccountSubscriber],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule { }
