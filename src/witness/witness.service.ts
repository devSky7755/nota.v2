import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { StateEntity } from "src/state/entity/state.entity";
import { DeleteResult, Repository } from "typeorm";
import { CreateWitnessDto } from "./dto/witness.create-dto";
import { UpdateWitnessDto } from "./dto/witness.update-dto";
import { WitnessEntity } from "./entity/witness.entity";

@Injectable()
export class WitnessService {
  constructor(
    @InjectRepository(WitnessEntity)
    private witnessRepository: Repository<WitnessEntity>,
    @InjectRepository(StateEntity)
    private StateRepository: Repository<StateEntity>,
  ) { }

  async createWitness(witness: CreateWitnessDto): Promise<WitnessEntity> {
    const {
      state,
      ...dto
    } = witness;

    return await this.witnessRepository.save({
      state: await this.StateRepository.findOne({
        id: state
      }),
      ...dto,
    });
  }

  async findAllWitness(): Promise<WitnessEntity[]> {
    return await this.witnessRepository.find();
  }

  async findWitness(witnessId: number): Promise<WitnessEntity> {
    return await this.witnessRepository.findOne({ id: witnessId });
  }

  async updateWitnessById(
    witnessId: number,
    updateWitnessDto: UpdateWitnessDto
  ): Promise<WitnessEntity> {
    const witness = await this.witnessRepository.findOne(witnessId);
    if (!witness)
      throw new NotFoundException(`there is no witness with ID ${witnessId}`);
    const {
      state,
      ...dto
    } = updateWitnessDto;

    if (state) {
      dto['state'] = await this.StateRepository.findOne({ id: state })
    }
    return await this.witnessRepository.save(plainToClass(WitnessEntity, { ...witness, ...dto }));
  }

  async removeWitnessById(id: number): Promise<DeleteResult> {
    return await this.witnessRepository.delete(id);
  }
}
