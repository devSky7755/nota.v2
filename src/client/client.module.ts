import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { ClientEntity } from "./entity/client.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { AccountEntity } from "src/account/entity/account.entity";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";
import { KbaEntity } from "src/kba/entity/kba.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, StateEntity, AccountEntity, KbaEntity])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule { }
