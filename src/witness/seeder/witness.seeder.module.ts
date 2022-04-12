import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WitnessEntity } from "../entity/witness.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { WitnessSeederService } from "./witness.seeder.service";

const seederServices = [
  WitnessSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([WitnessEntity, StateEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class WitnessSeederModule { }
