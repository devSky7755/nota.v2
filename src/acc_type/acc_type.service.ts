import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { CreateAccTypeDto } from "./dto/acc_type.create-dto";
import { UpdateAccTypeDto } from "./dto/acc_type.update-dto";
import { AccTypeEntity } from "./entity/acc_type.entity";

@Injectable()
export class AccTypeService {
  constructor(
    @InjectRepository(AccTypeEntity)
    private accTypeRepository: Repository<AccTypeEntity>,
  ) { }

  async findAllAccTypes(): Promise<AccTypeEntity[]> {
    return await this.accTypeRepository.find();
  }

  async findAccTypeById(id: number): Promise<AccTypeEntity> {
    return await this.accTypeRepository.findOne({ id });
  }

  async createAccType(accType: CreateAccTypeDto): Promise<AccTypeEntity> {
    return await this.accTypeRepository.save({
      ...accType,
    });
  }

  async updateAccTypeById(id: number, updateAccTypeDto: UpdateAccTypeDto): Promise<AccTypeEntity> {
    const accType = await this.accTypeRepository.findOne(id);
    if (!accType)
      throw new NotFoundException(`there is no account type with ID ${id}`);

    return await this.accTypeRepository.save(plainToClass(AccTypeEntity, { ...accType, ...updateAccTypeDto }));
  }

  async removeAccTypeById(id: number): Promise<AccTypeEntity> {
    const accType = await this.accTypeRepository.findOne(id);
    if (!accType)
      throw new NotFoundException(`there is no account type with ID ${id}`);
    return await this.accTypeRepository.remove(accType);
  }
}
