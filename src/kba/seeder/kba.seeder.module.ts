import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientEntity } from "src/client/entity/client.entity";
import { KbaEntity } from "../entity/kba.entity";
import { KbaSeederService } from "./kba.seeder.service";

const seederServices = [
  KbaSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([KbaEntity, ClientEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class KbaSeederModule { }
