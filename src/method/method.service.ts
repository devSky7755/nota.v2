import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { CreateMethodDto } from "./dto/method.create-dto";
import { UpdateMethodDto } from "./dto/method.update-dto";
import { MethodEntity } from "./entity/method.entity";

@Injectable()
export class MethodService {
  constructor(
    @InjectRepository(MethodEntity)
    private methodRepository: Repository<MethodEntity>,
  ) { }

  async findAllMethods(): Promise<MethodEntity[]> {
    return await this.methodRepository.find();
  }

  async findMethodById(id: number): Promise<MethodEntity> {
    return await this.methodRepository.findOne({ id });
  }

  async createMethod(method: CreateMethodDto): Promise<MethodEntity> {
    return await this.methodRepository.save({
      ...method,
    });
  }

  async updateMethodById(id: number, updateMethodDto: UpdateMethodDto): Promise<MethodEntity> {
    const method = await this.methodRepository.findOne(id);
    if (!method)
      throw new NotFoundException(`there is no method_of_id with ID ${id}`);

    return await this.methodRepository.save(plainToClass(MethodEntity, { ...method, ...updateMethodDto }));
  }

  async removeMethodById(id: number): Promise<MethodEntity> {
    const method = await this.methodRepository.findOne(id);
    if (!method)
      throw new NotFoundException(`there is no method_of_id with ID ${id}`);


    return await this.methodRepository.remove(method);
  }
}
