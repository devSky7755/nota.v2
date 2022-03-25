import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { DocEntity } from "./entity/doc.entity";
import { DocController } from "./doc.controller";
import { DocService } from "./doc.service";

@Module({
  imports: [TypeOrmModule.forFeature([DocEntity])],
  controllers: [DocController],
  providers: [DocService],
  exports: [DocService],
})
export class DocModule { }
