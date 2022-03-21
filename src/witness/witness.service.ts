import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWitnessDto } from "./dto/witness.create-dto";
import { WitnessEntity } from "./entity/witness.entity";

@Injectable()
export class WitnessService {
  constructor(
    @InjectRepository(WitnessEntity)
    private witnessRepository: Repository<WitnessEntity>
  ) {}

  async createWitness(witness: CreateWitnessDto): Promise<WitnessEntity> {
    return await this.witnessRepository.save({
      ...witness,
    });
  }

  async findAllWitness(): Promise<WitnessEntity[]> {
    return await this.witnessRepository.find();
  }

  async findWitness(witnessId: number): Promise<WitnessEntity> {
    return await this.witnessRepository.findOne({ id: witnessId });
  }
}
