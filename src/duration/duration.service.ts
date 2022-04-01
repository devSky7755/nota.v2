import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { CreateDurationDto } from "./dto/duration.create-dto";
import { UpdateDurationDto } from "./dto/duration.update-dto";
import { DurationEntity } from "./entity/duration.entity";

@Injectable()
export class DurationService {
  constructor(
    @InjectRepository(DurationEntity)
    private durationRepository: Repository<DurationEntity>,
  ) { }

  async findAllDurations(): Promise<DurationEntity[]> {
    return await this.durationRepository.find();
  }

  async findDurationById(id: number): Promise<DurationEntity> {
    return await this.durationRepository.findOne({ id });
  }

  async createDuration(duration: CreateDurationDto): Promise<DurationEntity> {
    return await this.durationRepository.save({
      ...duration,
    });
  }

  async updateDurationById(id: number, updateDurationDto: UpdateDurationDto): Promise<DurationEntity> {
    const duration = await this.durationRepository.findOne(id);
    if (!duration)
      throw new NotFoundException(`there is no duration with ID ${id}`);

    return await this.durationRepository.save(plainToClass(DurationEntity, { ...duration, ...updateDurationDto }));
  }

  async removeDurationById(id: number): Promise<DurationEntity> {
    const duration = await this.durationRepository.findOne(id);
    if (!duration)
      throw new NotFoundException(`there is no duration with ID ${id}`);

    return await this.durationRepository.remove(duration);
  }
}
