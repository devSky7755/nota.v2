import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocEntity } from "../entity/doc.entity";
import { DocActionEntity } from "../entity/doc.action.entity";
import { DocStatusEntity } from "../entity/doc.status.entity";
import { DocSeederService } from "./doc.seeder.service";
import { SessionEntity } from "src/session/entity/session.entity";
import { ClientEntity } from "src/client/entity/client.entity";

const seederServices = [
  DocSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([DocEntity, DocActionEntity, DocStatusEntity, SessionEntity, ClientEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class DocSeederModule { }
