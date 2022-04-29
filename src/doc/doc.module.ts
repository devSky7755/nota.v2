import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { DocEntity } from "./entity/doc.entity";
import { DocActionEntity } from "./entity/doc.action.entity";
import { DocStatusEntity } from "./entity/doc.status.entity";

import { DocActionController, DocController, DocStatusController } from "./doc.controller";
import { DocActionService, DocService, DocStatusService } from "./doc.service";
import { DocSubscriber } from "./doc.subscriber";
import { ClientEntity } from "src/client/entity/client.entity";
import { SessionEntity } from "src/session/entity/session.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DocEntity, DocActionEntity, DocStatusEntity, ClientEntity, SessionEntity])],
  controllers: [DocController, DocActionController, DocStatusController],
  providers: [DocService, DocActionService, DocStatusService, DocSubscriber],
  exports: [DocService, DocActionService, DocStatusService],
})
export class DocModule { }
