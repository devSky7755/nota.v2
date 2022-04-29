import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToClass } from 'class-transformer';
import { S3 } from 'aws-sdk';
import { CreateClientDto } from "../dto/client.create-dto";
import { ClientEntity } from "../entity/client.entity";
import { seedClients } from "./client.seeder.data";
import { StateEntity } from "src/state/entity/state.entity";
import { AccountEntity } from "src/account/entity/account.entity";
import { KbaEntity } from "src/kba/entity/kba.entity";
import { TimezoneEntity } from "src/timezone/entity/timezone.entity";
import * as bcrypt from "bcrypt";
import { emptyS3Directory } from "src/providers/utils";

/**
 * Service dealing with client based operations.
 *
 * @class
 */
@Injectable()
export class ClientSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<ClientEntity>} clientRepository
     */
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>,
        @InjectRepository(StateEntity)
        private StateRepository: Repository<StateEntity>,
        @InjectRepository(AccountEntity)
        private AccountRepository: Repository<AccountEntity>,
        @InjectRepository(KbaEntity)
        private kbaRepository: Repository<KbaEntity>,
        @InjectRepository(TimezoneEntity)
        private tzRepository: Repository<TimezoneEntity>,
    ) { }
    /**
     * Seed all clients.
     *
     * @function
     */
    create(): Array<Promise<ClientEntity>> {
        return seedClients.map(async (client: CreateClientDto) => {
            return await this.clientRepository
                .findOne({ email: client.email })
                .then(async dbClient => {
                    // We check if a client already exists.
                    // If it does don't create a new one.
                    if (dbClient) {
                        return Promise.resolve(null);
                    }
                    const {
                        ssn,
                        state,
                        billingState,
                        dlState,
                        accIds,
                        kbas,
                        tz,
                        ...dto
                    } = client;
                    const s3 = new S3();
                    const hashSSn: string = await bcrypt.hash(ssn, 12);

                    const kbaEnts = await this.kbaRepository.save(kbas);
                    const savedClient =
                        await this.clientRepository.save(plainToClass(ClientEntity, {
                            ssn: hashSSn,
                            state: await this.StateRepository.findOne({
                                id: state,
                            }),
                            billingState: await this.StateRepository.findOne({
                                id: billingState,
                            }),
                            dlState: await this.StateRepository.findOne({
                                id: dlState,
                            }),
                            accounts: await this.AccountRepository.findByIds(accIds || []),
                            kbas: kbaEnts,
                            timezone: await this.tzRepository.findOne(tz),
                            ...dto,
                        }))

                    emptyS3Directory(`${savedClient.id}/`)
                    const createFolderRes = await s3.upload({
                        Bucket: process.env.AWS_S3_BUCKET,
                        Key: `${savedClient.id}/`,
                        Body: ''
                    }).promise();

                    return Promise.resolve(savedClient)
                })
                .catch(error => Promise.reject(error));
        });
    }
}