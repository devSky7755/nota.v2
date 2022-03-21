import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateClientDto } from "./dto/client.create-dto";
import { ClientEntity } from "./entity/client.entity";

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private recordRepository: Repository<ClientEntity>
  ) {}

  async createClient(record: CreateClientDto): Promise<ClientEntity> {
    return await this.recordRepository.save({
      ...record,
    });
  }

  async findAllClient(): Promise<ClientEntity[]> {
    return await this.recordRepository.find();
  }

  async findClient(recordId: number): Promise<ClientEntity> {
    return await this.recordRepository.findOne({ id: recordId });
  }
}
