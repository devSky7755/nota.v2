import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountController } from "./account.controller";
import { AccountEntity } from "./entity/account.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { AccountService } from "./account.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    TypeOrmModule.forFeature([StateEntity]),
    forwardRef(() => AuthModule),
  ],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule { }
