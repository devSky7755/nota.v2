import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToClass } from 'class-transformer';
import { CreateAccountDto } from "../dto/account.create-dto";
import { AccountEntity } from "../entity/account.entity";
import { seedAccounts, seedAccountStatuses } from "./account.seeder.data";
import { StateEntity } from "src/state/entity/state.entity";
import { AccTypeEntity } from "src/acc_type/entity/acc_type.entity";
import { AccountStatusEntity } from "../entity/account.status.entity";

/**
 * Service dealing with account based operations.
 *
 * @class
 */
@Injectable()
export class AccountSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<AccountEntity>} accountRepository
     */
    constructor(
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
        @InjectRepository(StateEntity)
        private StateRepository: Repository<StateEntity>,
        @InjectRepository(AccTypeEntity)
        private AccTypeRepository: Repository<AccTypeEntity>,
        @InjectRepository(AccountStatusEntity)
        private AccStatusRepository: Repository<AccountStatusEntity>,
    ) { }
    /**
     * Seed all accounts.
     *
     * @function
     */
    create(): Array<Promise<AccountEntity>> {
        return seedAccounts.map(async (account: CreateAccountDto) => {
            return await this.accountRepository
                .findOne({ companyName: account.companyName })
                .then(async dbAccount => {
                    // We check if a account already exists.
                    // If it does don't create a new one.
                    if (dbAccount) {
                        return Promise.resolve(null);
                    }
                    const {
                        state,
                        billingState,
                        accType,
                        status,
                        ...dto
                    } = account;
                    return Promise.resolve(
                        await this.accountRepository.save(plainToClass(AccountEntity, {
                            state: await this.StateRepository.findOne({
                                id: state,
                            }),
                            accType: await this.AccTypeRepository.findOne({
                                id: accType,
                            }),
                            status: await this.AccStatusRepository.findOne({
                                id: status,
                            }),
                            billingState: await this.StateRepository.findOne({
                                id: billingState,
                            }),
                            ...dto
                        }))
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}

/**
 * Service dealing with account based operations.
 *
 * @class
 */
@Injectable()
export class AccountStatusSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<AccountStatusEntity>} accountStatusRepository
     */
    constructor(
        @InjectRepository(AccountStatusEntity)
        private accStatusRepository: Repository<AccountStatusEntity>,
    ) { }
    /**
     * Seed all records.
     *
     * @function
     */
    create(): Array<Promise<AccountStatusEntity>> {
        return seedAccountStatuses.map(async (record: any) => {
            return await this.accStatusRepository
                .findOne({ name: record.name })
                .then(async dbRecord => {
                    // We check if a record already exists.
                    // If it does don't create a new one.
                    if (dbRecord) {
                        return Promise.resolve(null);
                    }
                    return Promise.resolve(
                        await this.accStatusRepository.save({
                            ...record,
                        })
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}