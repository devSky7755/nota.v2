import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { AuditEntity } from "./entity/audit.entity";
import { AccountEntity } from "src/account/entity/account.entity";
import { AuditController } from "./audit.controller";
import { AuditService } from "./audit.service";

@Module({
  imports: [TypeOrmModule.forFeature([AuditEntity, AccountEntity])],
  controllers: [AuditController],
  providers: [AuditService],
})
export class AuditModule { }
