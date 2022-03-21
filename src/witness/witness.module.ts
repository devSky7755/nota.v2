import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { WitnessEntity } from "./entity/witness.entity";
import { WitnessController } from "./witness.controller";
import { WitnessService } from "./witness.service";

@Module({
  imports: [TypeOrmModule.forFeature([WitnessEntity])],
  controllers: [WitnessController],
  providers: [WitnessService],
})
export class WitnessModule {}
