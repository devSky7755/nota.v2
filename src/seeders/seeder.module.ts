import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { DatabaseType } from "typeorm";
import { ConfigModule } from "@nestjs/config";

import { Seeder } from "./seeder";
import { AccountSeederModule } from "src/account/seeder/account.seeder.module";
import { AccountTypeSeederModule } from "src/acc_type/seeder/acc_type.seeder.module";
import { AssociateSeederModule } from "src/associate/seeder/associate.seeder.module";
import { ClientSeederModule } from "src/client/seeder/client.seeder.module";
import { BillingSeederModule } from "src/billing/seeder/billing.seeder.module";
import { UserSeederModule } from "src/user/seeder/user.seeder.module";
import { StateSeederModule } from "src/state/seeder/state.seeder.module";
import { DurationSeederModule } from "src/duration/seeder/duration.seeder.module";
import { KbaSeederModule } from "src/kba/seeder/kba.seeder.module";
import { WitnessSeederModule } from "src/witness/seeder/witness.seeder.module";
import { TypeSeederModule } from "src/type/seeder/type.seeder.module";
import { DocSeederModule } from "src/doc/seeder/doc.seeder.module";
import { MethodSeederModule } from "src/method/seeder/method.seeder.module";
import { NotaryDetailSeederModule } from "src/notary_detail/seeder/notary_detail.seeder.module";
import { RoleSeederModule } from "src/role/seeder/role.seeder.module";
import { RecordSeederModule } from "src/record/seeder/record.seeder.module";
import { SessionSeederModule } from "src/session/seeder/session.seeder.module";
import { TimezoneSeederModule } from "src/timezone/seeder/timezone.seeder.module";

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: async () => ({
                type: 'postgres' as DatabaseType,
                host: process.env.DATABASE_HOST,
                port: 5432,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                entities: ["src/**/*.entity{.ts,.js}"],
                synchronize: true,
            }),
        } as TypeOrmModuleAsyncOptions),
        AccountTypeSeederModule,
        AccountSeederModule,
        AssociateSeederModule,
        WitnessSeederModule,
        ClientSeederModule,
        BillingSeederModule,
        RoleSeederModule,
        UserSeederModule,
        StateSeederModule,
        TypeSeederModule,
        DurationSeederModule,
        KbaSeederModule,
        DocSeederModule,
        MethodSeederModule,
        NotaryDetailSeederModule,
        RecordSeederModule,
        SessionSeederModule,
        TimezoneSeederModule,
    ],
    providers: [Logger, Seeder],
})
export class SeederModule { }