import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoleDto } from "../dto/role.create-dto";
import { seedRoles } from "./role.seeder.data";
import { RoleEntity } from "src/role/entity/role.entity";

/**
 * Service dealing with role based operations.
 *
 * @class
 */
@Injectable()
export class RoleSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<RoleEntity>} roleRepository
     */
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ) { }
    /**
     * Seed all roles.
     *
     * @function
     */
    create(): Array<Promise<RoleEntity>> {
        return seedRoles.map(async (role: CreateRoleDto) => {
            return await this.roleRepository
                .findOne({ name: role.name })
                .then(async dbRole => {
                    // We check if a role already exists.
                    // If it does don't create a new one.
                    if (dbRole) {
                        return Promise.resolve(null);
                    }
                    return Promise.resolve(
                        await this.roleRepository.save({
                            ...role,
                        })
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}