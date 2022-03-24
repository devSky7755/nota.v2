import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { AccUserJoinEntity, UserEntity } from "./entity/user.entity";
import { AccountEntity } from "src/account/entity/account.entity";
import { BlockJwtEntity } from "./entity/block.jwt.entity";
import { UserService } from "./user.service";
import { UserSubscriber } from "./user.subscriber";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([AccUserJoinEntity, UserEntity, AccountEntity, BlockJwtEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
  exports: [UserService],
})
export class UserModule { }
