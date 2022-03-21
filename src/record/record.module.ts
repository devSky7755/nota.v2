import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { RecordEntity } from "./entity/record.entity";
import { RecordController } from "./record.controller";
import { RecordService } from "./record.service";

@Module({
  imports: [TypeOrmModule.forFeature([RecordEntity])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
