import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "../entity/role.entity";
import { RoleSeederService } from "./role.seeder.service";

const seederServices = [
  RoleSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class RoleSeederModule { }
