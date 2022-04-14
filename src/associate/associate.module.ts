import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { AssociateEntity } from "./entity/associate.entity";
import { StateEntity } from "src/state/entity/state.entity";

import { AssociateController } from "./associate.controller";
import { AssociateService } from "./associate.service";
import { AssociateSubscriber } from "./associate.subscriber";
import { TimezoneEntity } from "src/timezone/entity/timezone.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AssociateEntity, StateEntity, TimezoneEntity])],
  controllers: [AssociateController],
  providers: [AssociateService, AssociateSubscriber],
})
export class AssociateModule { }
