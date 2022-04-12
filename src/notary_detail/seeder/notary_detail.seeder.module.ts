import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StateEntity } from "src/state/entity/state.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { NotaryDetailEntity } from "../entity/notary_detail.entity";
import { NotaryDetailSeederService } from "./notary_detail.seeder.service";

const seederServices = [
  NotaryDetailSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([NotaryDetailEntity, StateEntity, UserEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class NotaryDetailSeederModule { }
