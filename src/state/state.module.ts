import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { StateEntity } from "./entity/state.entity";
import { StateController } from "./state.controller";
import { StateService } from "./state.service";

@Module({
  imports: [TypeOrmModule.forFeature([StateEntity])],
  controllers: [StateController],
  providers: [StateService],
  exports: [StateService],
})
export class StateModule { }
