import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "../entity/client.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { KbaEntity } from "src/kba/entity/kba.entity";
import { AccountEntity } from "src/account/entity/account.entity";

import { ClientSeederService } from "./client.seeder.service";
import { TimezoneEntity } from "src/timezone/entity/timezone.entity";

const seederServices = [
  ClientSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity, StateEntity, AccountEntity, KbaEntity, TimezoneEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class ClientSeederModule { }
