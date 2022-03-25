import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateDocDto } from "./dto/doc.create-dto";
import { UpdateDocDto } from "./dto/doc.update-dto";
import { DocEntity } from "./entity/doc.entity";

@Injectable()
export class DocService {
  constructor(
    @InjectRepository(DocEntity)
    private docRepository: Repository<DocEntity>
  ) { }

  async findAllDocs(): Promise<DocEntity[]> {
    return await this.docRepository.find();
  }

  async findDocById(id: number): Promise<DocEntity> {
    return await this.docRepository.findOne({ id });
  }

  async createDoc(doc: CreateDocDto): Promise<DocEntity> {
    return await this.docRepository.save({
      ...doc,
    });
  }

  async updateDocById(id: number, doc: UpdateDocDto): Promise<UpdateResult> {
    return await this.docRepository.update({ id }, doc);
  }

  async removeDocById(id: number): Promise<DeleteResult> {
    return await this.docRepository.delete({ id });
  }
}
