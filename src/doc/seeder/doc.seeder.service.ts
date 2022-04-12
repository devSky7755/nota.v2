import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToClass } from 'class-transformer';
import { CreateDocDto } from "../dto/doc.create-dto";
import { DocEntity } from "../entity/doc.entity";
import { seedDocActions, seedDocs, seedDocStatuses } from "./doc.seeder.data";
import { DocStatusEntity } from "../entity/doc.status.entity";
import { DocActionEntity } from "../entity/doc.action.entity";
import { CreateDocActionDto } from "../dto/doc.action.create-dto";
import { CreateDocStatusDto } from "../dto/doc.status.create-dto";

/**
 * Service dealing with doc based operations.
 *
 * @class
 */
@Injectable()
export class DocSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<DocEntity>} docRepository
     */
    constructor(
        @InjectRepository(DocEntity)
        private docRepository: Repository<DocEntity>,
        @InjectRepository(DocActionEntity)
        private docActionRepository: Repository<DocActionEntity>,
        @InjectRepository(DocStatusEntity)
        private docStatusRepository: Repository<DocStatusEntity>
    ) { }

    /**
     * Seed all docs.
     *
     * @function
     */
    createActions(): Array<Promise<DocEntity>> {
        return seedDocActions.map(async (docAction: CreateDocActionDto) => {
            return await this.docActionRepository
                .findOne({ name: docAction.name })
                .then(async dbDocAction => {
                    // We check if a doc action already exists.
                    // If it does don't create a new one.
                    if (dbDocAction) {
                        return Promise.resolve(null);
                    }
                    return Promise.resolve(
                        this.docActionRepository.save({
                            ...docAction,
                        })
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
    /**
     * Seed all docs.
     *
     * @function
     */
    createStatuses(): Array<Promise<DocEntity>> {
        return seedDocStatuses.map(async (docStatus: CreateDocStatusDto) => {
            return await this.docStatusRepository
                .findOne({ name: docStatus.name })
                .then(async dbDocStatus => {
                    // We check if a doc status already exists.
                    // If it does don't create a new one.
                    if (dbDocStatus) {
                        return Promise.resolve(null);
                    }
                    return Promise.resolve(
                        await this.docStatusRepository.save({
                            ...docStatus,
                        })
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }

    /**
     * Seed all docs.
     *
     * @function
     */
    create(): Array<Promise<DocEntity>> {
        return seedDocs.map(async (doc: any) => {
            return await this.docRepository
                .findOne({ docUrl: doc.docUrl })
                .then(async dbDoc => {
                    // We check if a doc already exists.
                    // If it does don't create a new one.
                    if (dbDoc) {
                        return Promise.resolve(null);
                    }
                    const {
                        action,
                        status,
                        ...dto
                    } = doc;
                    return Promise.resolve(
                        await this.docRepository.save({
                            action: await this.docActionRepository.findOne({
                                id: action,
                            }),
                            status: await this.docStatusRepository.findOne({
                                id: status,
                            }),
                            ...dto,
                        })
                    );
                })
                .catch(error => Promise.reject(error));
        });
    }
}