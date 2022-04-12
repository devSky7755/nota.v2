import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MethodEntity } from "../entity/method.entity";
import { MethodSeederService } from "./method.seeder.service";

const seederServices = [
  MethodSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([MethodEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class MethodSeederModule { }
