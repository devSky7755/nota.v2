import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTimeZoneDto } from "../dto/timezone.create-dto";
import { seedTimezones } from "./timezone.seeder.data";
import { TimezoneEntity } from "src/timezone/entity/timezone.entity";
import { ClientEntity } from "src/client/entity/client.entity";

/**
 * Service dealing with timezone based operations.
 *
 * @class
 */
@Injectable()
export class TimezoneSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<TimezoneEntity>} timezoneRepository
     */
    constructor(
        @InjectRepository(TimezoneEntity)
        private readonly timezoneRepository: Repository<TimezoneEntity>
    ) { }
    /**
     * Seed all timezones.
     *
     * @function
     */
    create(): Array<Promise<TimezoneEntity>> {
        return seedTimezones.map(async (timezone: CreateTimeZoneDto) => {
            return await this.timezoneRepository
                .findOne({ abbr: timezone.abbr })
                .then(async dbTimezone => {
                    // We check if a timezone already exists.
                    // If it does don't create a new one.
                    if (dbTimezone) {
                        return Promise.resolve(null);
                    }
                    return Promise.resolve(
                        await this.timezoneRepository.save(timezone)
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}