import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { MethodEntity } from "src/method/entity/method.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { TypeEntity } from "src/type/entity/type.entity";
import { RecordEntity } from "./entity/record.entity";
import { RecordController } from "./record.controller";
import { RecordService } from "./record.service";

@Module({
  imports: [TypeOrmModule.forFeature([RecordEntity, StateEntity, TypeEntity, MethodEntity])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule { }
