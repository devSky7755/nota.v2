import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRecordDto } from "../dto/record.create-dto";
import { seedRecords } from "./record.seeder.data";
import { RecordEntity } from "src/record/entity/record.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { TypeEntity } from "src/type/entity/type.entity";
import { MethodEntity } from "src/method/entity/method.entity";
import { UserEntity } from "src/user/entity/user.entity";

/**
 * Service dealing with record based operations.
 *
 * @class
 */
@Injectable()
export class RecordSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<RecordEntity>} recordRepository
     */
    constructor(
        @InjectRepository(RecordEntity)
        private readonly recordRepository: Repository<RecordEntity>,
        @InjectRepository(StateEntity)
        private stateRepository: Repository<StateEntity>,
        @InjectRepository(TypeEntity)
        private typeRepository: Repository<TypeEntity>,
        @InjectRepository(MethodEntity)
        private methodRepository: Repository<MethodEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }
    /**
     * Seed all records.
     *
     * @function
     */
    create(): Array<Promise<RecordEntity>> {
        return seedRecords.map(async (record: CreateRecordDto) => {
            return await this.recordRepository
                .findOne({ uuid: record.uuid })
                .then(async dbRecord => {
                    // We check if a record already exists.
                    // If it does don't create a new one.
                    if (dbRecord) {
                        return Promise.resolve(null);
                    }
                    const {
                        typeOfNotarization,
                        methodOfId,
                        dlState,
                        ...dto
                    } = record;
                    return Promise.resolve(
                        await this.recordRepository.save({
                            typeOfNotarization: await this.typeRepository.findOne({
                                id: typeOfNotarization
                            }),
                            methodOfId: await this.methodRepository.findOne({
                                id: methodOfId
                            }),
                            dlState: await this.stateRepository.findOne({
                                id: dlState
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