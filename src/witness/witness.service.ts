import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { StateEntity } from "src/state/entity/state.entity";
import { TimezoneEntity } from "src/timezone/entity/timezone.entity";
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
    @InjectRepository(TimezoneEntity)
    private tzRepository: Repository<TimezoneEntity>,
  ) { }

  async createWitness(witness: CreateWitnessDto): Promise<WitnessEntity> {
    const {
      state,
      tz,
      ...dto
    } = witness;

    return await this.witnessRepository.save({
      state: await this.StateRepository.findOne({
        id: state
      }),
      timezone: await this.tzRepository.findOne(tz),
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
      tz,
      ...dto
    } = updateWitnessDto;

    if (state) {
      dto['state'] = await this.StateRepository.findOne({ id: state })
    }

    if (tz) {
      dto['timezone'] = await this.tzRepository.findOne(tz)
    }

    return await this.witnessRepository.save(plainToClass(WitnessEntity, { ...witness, ...dto }));
  }

  async removeWitnessById(id: number): Promise<WitnessEntity> {
    const witness = await this.witnessRepository.findOne(id);
    if (!witness)
      throw new NotFoundException(`there is no witness with ID ${id}`);

    return await this.witnessRepository.remove(witness);
  }
}
