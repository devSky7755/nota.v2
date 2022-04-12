import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeEntity } from "../entity/type.entity";
import { TypeSeederService } from "./type.seeder.service";

const seederServices = [
  TypeSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class TypeSeederModule { }
