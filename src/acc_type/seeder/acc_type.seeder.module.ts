import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccTypeEntity } from "src/acc_type/entity/acc_type.entity";
import { AccTypeSeederService } from "./acc_type.seeder.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([AccTypeEntity])
  ],
  providers: [AccTypeSeederService],
  exports: [AccTypeSeederService],
})
export class AccountTypeSeederModule { }
