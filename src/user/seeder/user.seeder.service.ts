import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from "../dto/user.create-dto";
import { UserDetailEntity, UserEntity } from "../entity/user.entity";
import { seedUsers } from "./user.seeder.data";
import { StateEntity } from "src/state/entity/state.entity";
import { AccountEntity } from "src/account/entity/account.entity";
import { AuthService } from "src/auth/auth.service";
import * as bcrypt from "bcrypt";

/**
 * Service dealing with user based operations.
 *
 * @class
 */
@Injectable()
export class UserSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<UserEntity>} userRepository
     */
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(UserDetailEntity)
        private userDetailRepository: Repository<UserDetailEntity>,
        @InjectRepository(StateEntity)
        private stateRepository: Repository<StateEntity>,
        @InjectRepository(AccountEntity)
        private AccountRepository: Repository<AccountEntity>,
    ) { }
    /**
     * Seed all users.
     *
     * @function
     */
    create(): Array<Promise<UserEntity>> {
        return seedUsers.map(async (user: CreateUserDto) => {
            return await this.userRepository
                .findOne({ email: user.email })
                .then(async dbUser => {
                    // We check if a user already exists.
                    // If it does don't create a new one.
                    if (dbUser) {
                        return Promise.resolve(null);
                    } const {
                        password,
                        accIds,
                        userDetails,
                        ...dto
                    } = user;
                    const hashPassword: string = await bcrypt.hash(password, 12);
                    const convUserDetails = [];
                    for (let index = 0; index < userDetails.length; index++) {
                        const { state, ...udDto } = userDetails[index];
                        convUserDetails.push({
                            state: await this.stateRepository.findOne({ id: state }),
                            ...udDto
                        })
                    }

                    const userDetailEnts = await this.userDetailRepository.save(convUserDetails);

                    return Promise.resolve(
                        await this.userRepository.save(plainToClass(UserEntity, {
                            password: hashPassword,
                            accounts: await this.AccountRepository.findByIds(accIds || []),
                            userDetails: userDetailEnts,
                            ...dto,
                        }))
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}