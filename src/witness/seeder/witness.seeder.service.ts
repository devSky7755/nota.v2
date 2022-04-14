import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToClass } from 'class-transformer';
import { CreateWitnessDto } from "../dto/witness.create-dto";
import { WitnessEntity } from "../entity/witness.entity";
import { seedWitnesss } from "./witness.seeder.data";
import { StateEntity } from "src/state/entity/state.entity";
import { TimezoneEntity } from "src/timezone/entity/timezone.entity";

/**
 * Service dealing with witness based operations.
 *
 * @class
 */
@Injectable()
export class WitnessSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<WitnessEntity>} witnessRepository
     */
    constructor(
        @InjectRepository(WitnessEntity)
        private readonly witnessRepository: Repository<WitnessEntity>,
        @InjectRepository(StateEntity)
        private StateRepository: Repository<StateEntity>,
        @InjectRepository(TimezoneEntity)
        private tzRepository: Repository<TimezoneEntity>,
    ) { }
    /**
     * Seed all witnesss.
     *
     * @function
     */
    create(): Array<Promise<WitnessEntity>> {
        return seedWitnesss.map(async (witness: CreateWitnessDto) => {
            return await this.witnessRepository
                .findOne({ email: witness.email })
                .then(async dbWitness => {
                    // We check if a witness already exists.
                    // If it does don't create a new one.
                    if (dbWitness) {
                        return Promise.resolve(null);
                    }
                    const {
                        state,
                        tz,
                        ...dto
                    } = witness;
                    return Promise.resolve(
                        await this.witnessRepository.save(plainToClass(WitnessEntity, {
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