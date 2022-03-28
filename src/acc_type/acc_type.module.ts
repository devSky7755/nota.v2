import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { AccTypeEntity } from "./entity/acc_type.entity";
import { AccTypeController } from "./acc_type.controller";
import { AccTypeService } from "./acc_type.service";

@Module({
  imports: [TypeOrmModule.forFeature([AccTypeEntity])],
  controllers: [AccTypeController],
  providers: [AccTypeService],
  exports: [AccTypeService],
})
export class AccTypeModule { }
