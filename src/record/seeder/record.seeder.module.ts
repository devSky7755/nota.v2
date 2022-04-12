import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MethodEntity } from "src/method/entity/method.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { TypeEntity } from "src/type/entity/type.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { RecordEntity } from "../entity/record.entity";
import { RecordSeederService } from "./record.seeder.service";

const seederServices = [
  RecordSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([RecordEntity, UserEntity, StateEntity, TypeEntity, MethodEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class RecordSeederModule { }
