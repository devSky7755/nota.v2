import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { AccountEntity } from "src/account/entity/account.entity";
import { AssociateEntity } from "src/associate/entity/associate.entity";
import { ClientEntity } from "src/client/entity/client.entity";
import { DocEntity } from "src/doc/entity/doc.entity";
import { DurationEntity } from "src/duration/entity/duration.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { SessionEntity } from "./entity/session.entity";
import { WitnessEntity } from "src/witness/entity/witness.entity";
import { NotarySessionTypeEntity } from "./entity/notary.session.type.entity";
import { SessionAssociateJoinEntity } from "./entity/session.assoc.join.entity";
import { SessionClientJoinEntity } from "./entity/session.client.join.entity";
import { SessionStatusEntity } from "./entity/session.status.entity";
import { SessionTypeEntity } from "./entity/session.types.entity";
import { SessionService } from "./session.service";
import { SessionSubscriber } from "./session.subscriber";
import { SessionTokenEntity } from "./entity/session.token.entity";
import { SmsService } from "src/sms/sms.service";
import { SGEmailService } from "src/sendgrid/sendgrid.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { SessionStatusService } from "./session.status.service";
import { SessionController } from "./session.controller";
import { SessionStatusController } from "./session.status.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity, AccountEntity, UserEntity, DurationEntity, SessionTypeEntity, SessionStatusEntity, NotarySessionTypeEntity, ClientEntity, WitnessEntity, AssociateEntity, DocEntity, SessionClientJoinEntity, SessionAssociateJoinEntity, SessionTokenEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
        signOptions: { expiresIn: "1d" },
      }),
    }), HttpModule],
  controllers: [SessionController, SessionStatusController],
  providers: [SessionService, SessionStatusService, SessionSubscriber, SmsService, SGEmailService],
  exports: [SessionService],
})
export class SessionModule { }
