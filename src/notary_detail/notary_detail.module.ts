import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { StateEntity } from "src/state/entity/state.entity";
import { NotaryDetailEntity } from "./entity/notary_detail.entity";
import { NotaryDetailController } from "./notary_detail.controller";
import { NotaryDetailService } from "./notary_detail.service";

@Module({
  imports: [TypeOrmModule.forFeature([NotaryDetailEntity, StateEntity])],
  controllers: [NotaryDetailController],
  providers: [NotaryDetailService],
  exports: [NotaryDetailService],
})
export class NotaryDetailModule { }
