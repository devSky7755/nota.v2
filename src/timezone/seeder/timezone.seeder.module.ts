import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TimezoneEntity } from "../entity/timezone.entity";
import { TimezoneSeederService } from "./timezone.seeder.service";

const seederServices = [
  TimezoneSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([TimezoneEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class TimezoneSeederModule { }
