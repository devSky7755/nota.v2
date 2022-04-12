import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStateDto } from "../dto/state.create-dto";
import { seedStates } from "./state.seeder.data";
import { StateEntity } from "src/state/entity/state.entity";

/**
 * Service dealing with state based operations.
 *
 * @class
 */
@Injectable()
export class StateSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<StateEntity>} stateRepository
     */
    constructor(
        @InjectRepository(StateEntity)
        private readonly stateRepository: Repository<StateEntity>,
    ) { }
    /**
     * Seed all states.
     *
     * @function
     */
    create(): Array<Promise<StateEntity>> {
        return seedStates.map(async (state: CreateStateDto) => {
            return await this.stateRepository
                .findOne({ abbr: state.abbr })
                .then(async dbState => {
                    // We check if a state already exists.
                    // If it does don't create a new one.
                    if (dbState) {
                        return Promise.resolve(null);
                    }
                    return Promise.resolve(
                        await this.stateRepository.save({
                            ...state,
                        })
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}