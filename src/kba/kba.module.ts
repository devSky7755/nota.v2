import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { ClientEntity } from "src/client/entity/client.entity";
import { KbaEntity } from "./entity/kba.entity";
import { KbaController } from "./kba.controller";
import { KbaService } from "./kba.service";

@Module({
  imports: [TypeOrmModule.forFeature([KbaEntity, ClientEntity])],
  controllers: [KbaController],
  providers: [KbaService],
  exports: [KbaService],
})
export class KbaModule { }
