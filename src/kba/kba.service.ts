import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { CreateKbaDto } from "./dto/kba.create-dto";
import { UpdateKbaDto } from "./dto/kba.update-dto";
import { ClientEntity } from "src/client/entity/client.entity";
import { KbaEntity } from "./entity/kba.entity";

@Injectable()
export class KbaService {
  constructor(
    @InjectRepository(KbaEntity)
    private kbaRepository: Repository<KbaEntity>,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>
  ) { }

  async findAllKbas(): Promise<KbaEntity[]> {
    return await this.kbaRepository.find();
  }

  async findKbaById(id: number): Promise<KbaEntity> {
    return await this.kbaRepository.findOne({ id });
  }

  async createKba(kba: CreateKbaDto): Promise<KbaEntity> {
    const {
      client,
      ...dto
    } = kba;
    return await this.kbaRepository.save({
      client: await this.clientRepository.findOne({
        id: client
      }),
      ...dto,
    });
  }

  async updateKbaById(id: number, updateKbaDto: UpdateKbaDto): Promise<KbaEntity> {
    const kba = await this.kbaRepository.findOne(id);
    if (!kba)
      throw new NotFoundException(`there is no kba with ID ${id}`);

    const {
      client,
      ...dto
    } = updateKbaDto;

    if (client) {
      dto['client'] = await this.clientRepository.findOne({ id: client })
    }

    return await this.kbaRepository.save(plainToClass(KbaEntity, { ...kba, ...dto }));
  }

  async removeKbaById(id: number): Promise<KbaEntity> {
    const kba = await this.kbaRepository.findOne(id);
    if (!kba)
      throw new NotFoundException(`there is no kba with ID ${id}`);

    return await this.kbaRepository.remove(kba);
  }
}
