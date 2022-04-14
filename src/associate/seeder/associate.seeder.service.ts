import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToClass } from 'class-transformer';
import { CreateAssociateDto } from "../dto/associate.create-dto";
import { AssociateEntity } from "../entity/associate.entity";
import { seedAssociates } from "./associate.seeder.data";
import { StateEntity } from "src/state/entity/state.entity";
import { TimezoneEntity } from "src/timezone/entity/timezone.entity";

/**
 * Service dealing with associate based operations.
 *
 * @class
 */
@Injectable()
export class AssociateSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<AssociateEntity>} associateRepository
     */
    constructor(
        @InjectRepository(AssociateEntity)
        private readonly associateRepository: Repository<AssociateEntity>,
        @InjectRepository(StateEntity)
        private StateRepository: Repository<StateEntity>,
        @InjectRepository(TimezoneEntity)
        private tzRepository: Repository<TimezoneEntity>,
    ) { }
    /**
     * Seed all associates.
     *
     * @function
     */
    create(): Array<Promise<AssociateEntity>> {
        return seedAssociates.map(async (associate: CreateAssociateDto) => {
            return await this.associateRepository
                .findOne({ email: associate.email })
                .then(async dbAssociate => {
                    // We check if a associate already exists.
                    // If it does don't create a new one.
                    if (dbAssociate) {
                        return Promise.resolve(null);
                    }
                    const {
                        state,
                        tz,
                        ...dto
                    } = associate;
                    return Promise.resolve(
                        await this.associateRepository.save(plainToClass(AssociateEntity, {
                            state: await this.StateRepository.findOne({
                                id: state,
                            }),
                            timezone: await this.tzRepository.findOne(tz),
                            ...dto
                        }))
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}