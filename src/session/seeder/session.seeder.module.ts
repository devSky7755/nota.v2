import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountEntity } from "src/account/entity/account.entity";
import { AssociateEntity } from "src/associate/entity/associate.entity";
import { ClientEntity } from "src/client/entity/client.entity";
import { DocEntity } from "src/doc/entity/doc.entity";
import { DurationEntity } from "src/duration/entity/duration.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { WitnessEntity } from "src/witness/entity/witness.entity";
import { NotarySessionTypeEntity } from "../entity/notary.session.type.entity";
import { SessionAssociateJoinEntity } from "../entity/session.assoc.join.entity";
import { SessionClientJoinEntity } from "../entity/session.client.join.entity";
import { SessionEntity } from "../entity/session.entity";
import { SessionStatusEntity } from "../entity/session.status.entity";
import { SessionTypeEntity } from "../entity/session.types.entity";
import { SessionSeederService } from "./session.seeder.service";

const seederServices = [
  SessionSeederService
]

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity, AccountEntity, UserEntity, DurationEntity, SessionTypeEntity, SessionStatusEntity, NotarySessionTypeEntity, ClientEntity, WitnessEntity, AssociateEntity, DocEntity, SessionClientJoinEntity, SessionAssociateJoinEntity])
  ],
  providers: [
    ...seederServices
  ],
  exports: [
    ...seederServices
  ],
})
export class SessionSeederModule { }
