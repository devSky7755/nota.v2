import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { MethodEntity } from "./entity/method.entity";
import { MethodController } from "./method.controller";
import { MethodService } from "./method.service";
import { MethodSubscriber } from "./method.subscriber";

@Module({
  imports: [TypeOrmModule.forFeature([MethodEntity])],
  controllers: [MethodController],
  providers: [MethodService, MethodSubscriber],
  exports: [MethodService],
})
export class MethodModule { }
