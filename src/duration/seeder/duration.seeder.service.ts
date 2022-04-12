import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDurationDto } from "../dto/duration.create-dto";
import { seedDurations } from "./duration.seeder.data";
import { DurationEntity } from "src/duration/entity/duration.entity";

/**
 * Service dealing with duration based operations.
 *
 * @class
 */
@Injectable()
export class DurationSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<DurationEntity>} durationRepository
     */
    constructor(
        @InjectRepository(DurationEntity)
        private readonly durationRepository: Repository<DurationEntity>,
    ) { }
    /**
     * Seed all durations.
     *
     * @function
     */
    create(): Array<Promise<DurationEntity>> {
        return seedDurations.map(async (duration: CreateDurationDto) => {
            return await this.durationRepository
                .findOne({ name: duration.name })
                .then(async dbDuration => {
                    // We check if a duration already exists.
                    // If it does don't create a new one.
                    if (dbDuration) {
                        return Promise.resolve(null);
                    }
                    return Promise.resolve(
                        await this.durationRepository.save({
                            ...duration,
                        })
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}