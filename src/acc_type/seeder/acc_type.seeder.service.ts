import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccTypeDto } from "../dto/acc_type.create-dto";
import { seedAccTypes } from "./acc_type.seeder.data";
import { AccTypeEntity } from "src/acc_type/entity/acc_type.entity";

/**
 * Service dealing with acc_types based operations.
 *
 * @class
 */
@Injectable()
export class AccTypeSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<AccTypeEntity>} accTypeRepository
     */
    constructor(
        @InjectRepository(AccTypeEntity)
        private accTypeRepository: Repository<AccTypeEntity>,
    ) { }
    /**
     * Seed all acc_types.
     *
     * @function
     */
    create(): Array<Promise<AccTypeEntity>> {
        return seedAccTypes.map(async (accType: CreateAccTypeDto) => {
            return await this.accTypeRepository
                .findOne({ name: accType.name })
                .then(async dbAccType => {
                    // We check if a account already exists.
                    // If it does don't create a new one.
                    if (dbAccType) {
                        return Promise.resolve(null);
                    }
                    return Promise.resolve(
                        await this.accTypeRepository.save({
                            ...accType,
                        })
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}