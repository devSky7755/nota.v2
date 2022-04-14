import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WitnessEntity } from "../entity/witness.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { WitnessSeederService } from "./witness.seeder.service";
import { TimezoneEntity } from "src/timezone/entity/timezone.entity";

const seederServices = [
  WitnessSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([WitnessEntity, StateEntity, TimezoneEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class WitnessSeederModule { }
