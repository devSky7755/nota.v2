import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateNotaryDetailDto } from "../dto/notary_detail.create-dto";
import { seedNotaryDetails } from "./notary_detail.seeder.data";
import { NotaryDetailEntity } from "src/notary_detail/entity/notary_detail.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { UserEntity } from "src/user/entity/user.entity";

/**
 * Service dealing with notary_detail based operations.
 *
 * @class
 */
@Injectable()
export class NotaryDetailSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<NotaryDetailEntity>} notary_detailRepository
     */
    constructor(
        @InjectRepository(NotaryDetailEntity)
        private readonly notaryDetailRepository: Repository<NotaryDetailEntity>,
        @InjectRepository(StateEntity)
        private stateRepository: Repository<StateEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }
    /**
     * Seed all notary_details.
     *
     * @function
     */
    create(): Array<Promise<NotaryDetailEntity>> {
        return seedNotaryDetails.map(async (notary_detail: CreateNotaryDetailDto) => {
            return await this.notaryDetailRepository
                .findOne({ comName: notary_detail.comName })
                .then(async dbNotaryDetail => {
                    // We check if a notary_detail already exists.
                    // If it does don't create a new one.
                    if (dbNotaryDetail) {
                        return Promise.resolve(null);
                    }
                    const {
                        comState,
                        ...dto
                    } = notary_detail;
                    return Promise.resolve(
                        await this.notaryDetailRepository.save({
                            comState: await this.stateRepository.findOne({
                                id: comState
                            }),
                            user: await this.userRepository.findOne({ id: 1 }),
                            ...dto,
                        })
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}