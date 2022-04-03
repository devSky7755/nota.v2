import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { RoleEntity } from "./entity/role.entity";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { RoleSubscriber } from "./role.subscriber";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService, RoleSubscriber],
  exports: [RoleService],
})
export class RoleModule { }
