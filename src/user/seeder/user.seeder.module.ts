import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccUserJoinEntity, UserDetailEntity, UserEntity } from "../entity/user.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { UserSeederService } from "./user.seeder.service";
import { NotaryDetailEntity } from "src/notary_detail/entity/notary_detail.entity";
import { AccountEntity } from "src/account/entity/account.entity";
import { BlockJwtEntity } from "../entity/block.jwt.entity";

const seederServices = [
  UserSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([AccUserJoinEntity, UserEntity, UserDetailEntity, NotaryDetailEntity, AccountEntity, BlockJwtEntity, StateEntity]),
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class UserSeederModule { }
