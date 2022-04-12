import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateKbaDto } from "../dto/kba.create-dto";
import { seedKbas } from "./kba.seeder.data";
import { KbaEntity } from "src/kba/entity/kba.entity";
import { ClientEntity } from "src/client/entity/client.entity";

/**
 * Service dealing with kba based operations.
 *
 * @class
 */
@Injectable()
export class KbaSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<KbaEntity>} kbaRepository
     */
    constructor(
        @InjectRepository(KbaEntity)
        private readonly kbaRepository: Repository<KbaEntity>,
        @InjectRepository(ClientEntity)
        private clientRepository: Repository<ClientEntity>
    ) { }
    /**
     * Seed all kbas.
     *
     * @function
     */
    create(): Array<Promise<KbaEntity>> {
        return seedKbas.map(async (kba: CreateKbaDto) => {
            return await this.kbaRepository
                .findOne({ question: kba.question })
                .then(async dbKba => {
                    // We check if a kba already exists.
                    // If it does don't create a new one.
                    if (dbKba) {
                        return Promise.resolve(null);
                    }
                    const {
                        client,
                        ...dto
                    } = kba;
                    return Promise.resolve(
                        await this.kbaRepository.save({
                            client: await this.clientRepository.findOne({
                                id: client
                            }),
                            ...dto,
                        })
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}