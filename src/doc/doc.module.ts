import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { DocEntity } from "./entity/doc.entity";
import { DocActionEntity } from "./entity/doc.action.entity";
import { DocStatusEntity } from "./entity/doc.status.entity";

import { DocActionController, DocController, DocStatusController } from "./doc.controller";
import { DocActionService, DocService, DocStatusService } from "./doc.service";

@Module({
  imports: [TypeOrmModule.forFeature([DocEntity, DocActionEntity, DocStatusEntity])],
  controllers: [DocController, DocActionController, DocStatusController],
  providers: [DocService, DocActionService, DocStatusService],
  exports: [DocService, DocActionService, DocStatusService],
})
export class DocModule { }
