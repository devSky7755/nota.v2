import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StateEntity } from "../entity/state.entity";
import { StateSeederService } from "./state.seeder.service";

const seederServices = [
  StateSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([StateEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class StateSeederModule { }
