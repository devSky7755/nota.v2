import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssociateEntity } from "../entity/associate.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { AssociateSeederService } from "./associate.seeder.service";
import { TimezoneEntity } from "src/timezone/entity/timezone.entity";

const seederServices = [
  AssociateSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([AssociateEntity, StateEntity, TimezoneEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class AssociateSeederModule { }
