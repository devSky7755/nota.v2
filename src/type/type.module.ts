import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { TypeEntity } from "./entity/type.entity";
import { TypeController } from "./type.controller";
import { TypeService } from "./type.service";
import { TypeSubscriber } from "./type.subscriber";

@Module({
  imports: [TypeOrmModule.forFeature([TypeEntity])],
  controllers: [TypeController],
  providers: [TypeService, TypeSubscriber],
  exports: [TypeService],
})
export class TypeModule { }
