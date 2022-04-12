import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import { CreateDocActionDto } from "./dto/doc.action.create-dto";
import { UpdateDocActionDto } from "./dto/doc.action.update-dto";
import { CreateDocDto } from "./dto/doc.create-dto";
import { UpdateDocDto } from "./dto/doc.update-dto";
import { DocActionEntity } from "./entity/doc.action.entity";
import { DocEntity } from "./entity/doc.entity";
import { DocStatusEntity } from "./entity/doc.status.entity";

@Injectable()
export class DocActionService {
  constructor(
    @InjectRepository(DocActionEntity)
    private docActionRepository: Repository<DocActionEntity>
  ) { }

  async findAll(): Promise<DocActionEntity[]> {
    return await this.docActionRepository.find();
  }

  async findById(id: number): Promise<DocActionEntity> {
    return await this.docActionRepository.findOne({ id });
  }

  async create(docAction: CreateDocActionDto): Promise<DocActionEntity> {
    return await this.docActionRepository.save({
      ...docAction,
    });
  }

  async updateById(id: number, docAction: UpdateDocActionDto): Promise<UpdateResult> {
    return await this.docActionRepository.update({ id }, docAction);
  }

  async removeById(id: number): Promise<DeleteResult> {
    return await this.docActionRepository.delete({ id });
  }
}

@Injectable()
export class DocStatusService {
  constructor(
    @InjectRepository(DocStatusEntity)
    private docStatusRepository: Repository<DocStatusEntity>
  ) { }

  async findAll(): Promise<DocStatusEntity[]> {
    return await this.docStatusRepository.find();
  }

  async findById(id: number): Promise<DocStatusEntity> {
    return await this.docStatusRepository.findOne({ id });
  }

  async create(docStatus: CreateDocActionDto): Promise<DocStatusEntity> {
    return await this.docStatusRepository.save({
      ...docStatus,
    });
  }

  async updateById(id: number, docAction: UpdateDocActionDto): Promise<UpdateResult> {
    return await this.docStatusRepository.update({ id }, docAction);
  }

  async removeById(id: number): Promise<DeleteResult> {
    return await this.docStatusRepository.delete({ id });
  }
}

@Injectable()
export class DocService {
  constructor(
    @InjectRepository(DocEntity)
    private docRepository: Repository<DocEntity>,
    @InjectRepository(DocActionEntity)
    private docActionRepository: Repository<DocActionEntity>,
    @InjectRepository(DocStatusEntity)
    private docStatusRepository: Repository<DocStatusEntity>
  ) { }

  async findAllDocs(): Promise<DocEntity[]> {
    return await this.docRepository.find();
  }

  async findDocById(id: number): Promise<DocEntity> {
    return await this.docRepository.findOne({ id });
  }

  async createDoc(doc: CreateDocDto, fileBuffer: Buffer, fileName: string, fileType: string): Promise<DocEntity> {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: process.env.AWS_S3_BUCKET,
      Body: fileBuffer,
      Key: `${uuid()}-${fileName}`
    }).promise();
    const {
      action,
      status,
      ...dto
    } = doc;

    return await this.docRepository.save({
      action: await this.docActionRepository.findOne({
        id: action,
      }),
      status: await this.docStatusRepository.findOne({
        id: status,
      }),
      docUrl: uploadResult.Location,
      docType: fileType,
      ...dto,
    });
  }

  async updateDocById(id: number, docDto: UpdateDocDto, fileBuffer: Buffer, fileName: string, fileType: string): Promise<DocEntity> {
    const doc = await this.docRepository.findOne(id);
    if (!doc)
      throw new NotFoundException(`there is no doc with ID ${id}`);
    const {
      action,
      status,
      ...dto
    } = docDto;

    const s3 = new S3();
    s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: doc.docUrl.replace(/^(https:\/\/s3.amazonaws.com\/notary.io-docs\/)/, '')
    }).promise();
    const uploadResult = await s3.upload({
      Bucket: process.env.AWS_S3_BUCKET,
      Body: fileBuffer,
      Key: `${uuid()}-${fileName}`
    }).promise();
    if (action) {
      dto['action'] = await this.docActionRepository.findOne({ id: action })
    }

    if (status) {
      dto['status'] = await this.docStatusRepository.findOne({ id: status })
    }

    return await this.docRepository.save(plainToClass(DocEntity, {
      ...doc,
      docUrl: uploadResult.Location,
      docType: fileType,
      ...dto
    }));
  }

  async removeDocById(id: number): Promise<DocEntity> {
    const doc = await this.docRepository.findOne(id);
    if (!doc)
      throw new NotFoundException(`there is no doc with ID ${id}`);
    return await this.docRepository.remove(doc);
  }
}
