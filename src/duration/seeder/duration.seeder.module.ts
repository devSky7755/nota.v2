import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DurationEntity } from "../entity/duration.entity";
import { DurationSeederService } from "./duration.seeder.service";

const seederServices = [
  DurationSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([DurationEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class DurationSeederModule { }
