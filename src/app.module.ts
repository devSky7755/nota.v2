import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TwilioModule } from 'nestjs-twilio';
import { QBModule } from "./quickbooks/quickbooks.module";
import { UserModule } from "./user/user.module";
import { AccountModule } from "./account/account.module";
import { AccTypeModule } from "./acc_type/acc_type.module";
import { RoleModule } from "./role/role.module";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./post/post.module";
import { RecordModule } from "./record/record.module";
import { BillingModule } from "./billing/billing.module";
import { SessionModule } from "./session/session.module";
import { DurationModule } from "./duration/duration.module";
import { ClientModule } from "./client/client.module";
import { WitnessModule } from "./witness/witness.module";
import { AssociateModule } from "./associate/associate.module";
import { AuditModule } from "./audit/audit.module";
import { StateModule } from "./state/state.module";
import { DocModule } from "./doc/doc.module";
import { KbaModule } from "./kba/kba.module";
import { TypeModule } from "./type/type.module";
import { NotaryDetailModule } from "./notary_detail/notary_detail.module";
import { MethodModule } from "./method/method.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { SmsModule } from "./sms/sms.module";
import { SGEmailModule } from "./sendgrid/sendgrid.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/static",
    }),
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
    QBModule,
    UserModule,
    AccountModule,
    AccTypeModule,
    RoleModule,
    AuthModule,
    PostModule,
    RecordModule,
    BillingModule,
    SessionModule,
    DurationModule,
    WitnessModule,
    ClientModule,
    AssociateModule,
    AuditModule,
    StateModule,
    DocModule,
    KbaModule,
    TypeModule,
    NotaryDetailModule,
    MethodModule,
    SmsModule,
    SGEmailModule,
  ],
})
export class AppModule { }
