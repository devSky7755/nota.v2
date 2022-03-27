import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { CreateTypeDto } from "./dto/type.create-dto";
import { UpdateTypeDto } from "./dto/type.update-dto";
import { TypeEntity } from "./entity/type.entity";

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(TypeEntity)
    private typeRepository: Repository<TypeEntity>,
  ) { }

  async findAllTypes(): Promise<TypeEntity[]> {
    return await this.typeRepository.find();
  }

  async findTypeById(id: number): Promise<TypeEntity> {
    return await this.typeRepository.findOne({ id });
  }

  async createType(type: CreateTypeDto): Promise<TypeEntity> {
    return await this.typeRepository.save({
      ...type,
    });
  }

  async updateTypeById(id: number, updateTypeDto: UpdateTypeDto): Promise<TypeEntity> {
    const type = await this.typeRepository.findOne(id);
    if (!type)
      throw new NotFoundException(`there is no type of notarization with ID ${id}`);

    return await this.typeRepository.save(plainToClass(TypeEntity, { ...type, ...updateTypeDto }));
  }

  async removeTypeById(id: number): Promise<DeleteResult> {
    return await this.typeRepository.delete({ id });
  }
}
