import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTypeDto } from "../dto/type.create-dto";
import { seedTypes } from "./type.seeder.data";
import { TypeEntity } from "src/type/entity/type.entity";

/**
 * Service dealing with type based operations.
 *
 * @class
 */
@Injectable()
export class TypeSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<TypeEntity>} typeRepository
     */
    constructor(
        @InjectRepository(TypeEntity)
        private readonly typeRepository: Repository<TypeEntity>,
    ) { }
    /**
     * Seed all types.
     *
     * @function
     */
    create(): Array<Promise<TypeEntity>> {
        return seedTypes.map(async (type: CreateTypeDto) => {
            return await this.typeRepository
                .findOne({ name: type.name })
                .then(async dbType => {
                    // We check if a type already exists.
                    // If it does don't create a new one.
                    if (dbType) {
                        return Promise.resolve(null);
                    }
                    return Promise.resolve(
                        await this.typeRepository.save({
                            ...type,
                        })
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}