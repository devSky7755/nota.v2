import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { DurationEntity } from "./entity/duration.entity";
import { DurationController } from "./duration.controller";
import { DurationService } from "./duration.service";
import { DurationSubscriber } from "./duration.subscriber";

@Module({
  imports: [TypeOrmModule.forFeature([DurationEntity])],
  controllers: [DurationController],
  providers: [DurationService, DurationSubscriber],
  exports: [DurationService],
})
export class DurationModule { }
