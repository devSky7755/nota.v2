import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEntity } from "../entity/account.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { AccTypeEntity } from "src/acc_type/entity/acc_type.entity";
import { AccountStatusEntity } from "../entity/account.status.entity";
import { AccountSeederService, AccountStatusSeederService } from "../seeder/account.seeder.service";

const seederServices = [
  AccountSeederService, AccountStatusSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, StateEntity, AccTypeEntity, AccountStatusEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class AccountSeederModule { }
