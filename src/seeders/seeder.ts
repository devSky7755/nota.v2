import { Injectable, Logger } from "@nestjs/common";
import { AccountSeederService, AccountStatusSeederService } from "src/account/seeder/account.seeder.service";
import { AccTypeSeederService } from "src/acc_type/seeder/acc_type.seeder.service";
import { AssociateSeederService } from "src/associate/seeder/associate.seeder.service";
import { BillingSeederService } from "src/billing/seeder/billing.seeder.service";
import { ClientSeederService } from "src/client/seeder/client.seeder.service";
import { DocSeederService } from "src/doc/seeder/doc.seeder.service";
import { DurationSeederService } from "src/duration/seeder/duration.seeder.service";
import { KbaSeederService } from "src/kba/seeder/kba.seeder.service";
import { MethodSeederService } from "src/method/seeder/method.seeder.service";
import { NotaryDetailSeederService } from "src/notary_detail/seeder/notary_detail.seeder.service";
import { RecordSeederService } from "src/record/seeder/record.seeder.service";
import { RoleSeederService } from "src/role/seeder/role.seeder.service";
import { SessionSeederService } from "src/session/seeder/session.seeder.service";
import { StateSeederService } from "src/state/seeder/state.seeder.service";
import { TypeSeederService } from "src/type/seeder/type.seeder.service";
import { UserSeederService } from "src/user/seeder/user.seeder.service";
import { WitnessSeederService } from "src/witness/seeder/witness.seeder.service";

@Injectable()
export class Seeder {
    constructor(
        private readonly logger: Logger,
        private readonly accTypeSeederService: AccTypeSeederService,
        private readonly accStatusSeederService: AccountStatusSeederService,
        private readonly roleSeederService: RoleSeederService,
        private readonly accountSeederService: AccountSeederService,
        private readonly associateSeederService: AssociateSeederService,
        private readonly witnessSeederService: WitnessSeederService,
        private readonly clientSeederService: ClientSeederService,
        private readonly billingSeederService: BillingSeederService,
        private readonly userSeederService: UserSeederService,
        private readonly notaryDetailSeederService: NotaryDetailSeederService,
        private readonly stateSeederService: StateSeederService,
        private readonly methodSeederService: MethodSeederService,
        private readonly typeSeederService: TypeSeederService,
        private readonly durationSeederService: DurationSeederService,
        private readonly kbaSeederService: KbaSeederService,
        private readonly docSeederService: DocSeederService,
        private readonly recordSeederService: RecordSeederService,
        private readonly sessionSeederService: SessionSeederService,
    ) { }
    async seed() {
        await this.states()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding states...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding states...');
                Promise.reject(error);
            });

        await this.durations()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding durations...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding durations...');
                Promise.reject(error);
            });

        await this.typesOfNotarizations()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding typesOfNotarizations...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding typesOfNotarizations...');
                Promise.reject(error);
            });

        await this.methods()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding methods...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding methods...');
                Promise.reject(error);
            });

        await this.accStatuses()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding accStatuses...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding accStatuses...');
                Promise.reject(error);
            });

        await this.accTypes()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding accTypes...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding accTypes...');
                Promise.reject(error);
            });

        await this.roles()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding roles...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding roles...');
                Promise.reject(error);
            });

        await this.users()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding users...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding users...');
                Promise.reject(error);
            });

        await this.notaryDetails()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding notaryDetails...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding notaryDetails...');
                Promise.reject(error);
            });

        await this.accounts()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding accounts...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding accounts...');
                Promise.reject(error);
            });

        await this.associates()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding associates...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding associates...');
                Promise.reject(error);
            });

        await this.witnesses()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding witnesses...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding witnesses...');
                Promise.reject(error);
            });

        await this.clients()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding clients...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding clients...');
                Promise.reject(error);
            });

        await this.kbas()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding kbas...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding kbas...');
                Promise.reject(error);
            });

        await this.docActions()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding docActions...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding docActions...');
                Promise.reject(error);
            });

        await this.docStatuses()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding docStatuses...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding docStatuses...');
                Promise.reject(error);
            });

        await this.docs()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding docs...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding docs...');
                Promise.reject(error);
            });

        await this.billings()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding billings...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding billings...');
                Promise.reject(error);
            });

        await this.records()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding records...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding records...');
                Promise.reject(error);
            });

        await this.sessions()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding sessions...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding sessions...');
                Promise.reject(error);
            });
    }

    async states() {
        return await Promise.all(this.stateSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of states created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async methods() {
        return await Promise.all(this.methodSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of methods created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async durations() {
        return await Promise.all(this.durationSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of durations created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async typesOfNotarizations() {
        return await Promise.all(this.typeSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of typesOfNotarizations created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async roles() {
        return await Promise.all(this.roleSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of roles created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async users() {
        return await Promise.all(this.userSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of users created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async notaryDetails() {
        return await Promise.all(this.notaryDetailSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of notaryDetails created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async accTypes() {
        return await Promise.all(this.accTypeSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of accTypes created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async accStatuses() {
        return await Promise.all(this.accStatusSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of accStatuses created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async accounts() {
        return await Promise.all(this.accountSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of accounts created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async associates() {
        return await Promise.all(this.associateSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of associates created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async witnesses() {
        return await Promise.all(this.witnessSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of witnesses created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async clients() {
        return await Promise.all(this.clientSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of clients created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async kbas() {
        return await Promise.all(this.kbaSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of kbas created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async billings() {
        return await Promise.all(this.billingSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of billings created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async docActions() {
        return await Promise.all(this.docSeederService.createActions())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of docActions created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async docStatuses() {
        return await Promise.all(this.docSeederService.createStatuses())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of docStatuses created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async docs() {
        return await Promise.all(this.docSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of docs created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async records() {
        return await Promise.all(this.recordSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of records created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }

    async sessions() {
        return await Promise.all(this.sessionSeederService.create())
            .then(createdRecords => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of sessions created : ' +
                    // Remove all null values and return only created records.
                    createdRecords.filter(
                        nullValueOrCreated => nullValueOrCreated,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }
}