import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { StateEntity } from "./entity/state.entity";
import { StateController } from "./state.controller";
import { StateService } from "./state.service";
import { StateSubscriber } from "./state.subscriber";

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity])],
  controllers: [StateController],
  providers: [StateService, StateSubscriber],
  exports: [StateService],
})
export class StateModule { }
