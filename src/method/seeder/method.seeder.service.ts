import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMethodDto } from "../dto/method.create-dto";
import { seedMethods } from "./method.seeder.data";
import { MethodEntity } from "src/method/entity/method.entity";
import { ClientEntity } from "src/client/entity/client.entity";

/**
 * Service dealing with method based operations.
 *
 * @class
 */
@Injectable()
export class MethodSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<MethodEntity>} methodRepository
     */
    constructor(
        @InjectRepository(MethodEntity)
        private readonly methodRepository: Repository<MethodEntity>,
    ) { }
    /**
     * Seed all methods.
     *
     * @function
     */
    create(): Array<Promise<MethodEntity>> {
        return seedMethods.map(async (method: CreateMethodDto) => {
            return await this.methodRepository
                .findOne({ name: method.name })
                .then(async dbMethod => {
                    // We check if a method already exists.
                    // If it does don't create a new one.
                    if (dbMethod) {
                        return Promise.resolve(null);
                    }
                    return Promise.resolve(
                        await this.methodRepository.save({
                            ...method,
                        })
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}