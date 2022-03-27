import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { MethodEntity } from "./entity/method.entity";
import { MethodController } from "./method.controller";
import { MethodService } from "./method.service";

@Module({
  imports: [TypeOrmModule.forFeature([MethodEntity])],
  controllers: [MethodController],
  providers: [MethodService],
  exports: [MethodService],
})
export class MethodModule { }
