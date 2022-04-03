import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateStateDto } from "./dto/state.create-dto";
import { UpdateStateDto } from "./dto/state.update-dto";
import { StateEntity } from "./entity/state.entity";

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private stateRepository: Repository<StateEntity>
  ) { }

  async findAllStates(): Promise<StateEntity[]> {
    return await this.stateRepository.find();
  }

  async findStateById(id: number): Promise<StateEntity> {
    return await this.stateRepository.findOne({ id });
  }

  async createState(state: CreateStateDto): Promise<StateEntity> {
    return await this.stateRepository.save({
      ...state,
    });
  }

  async updateStateById(id: number, stateDto: UpdateStateDto): Promise<UpdateResult> {
    const state = await this.stateRepository.findOne(id);
    if (!state)
      throw new NotFoundException(`there is no state with ID ${id}`);

    return await this.stateRepository.update({ id }, stateDto);
  }

  async removeStateById(id: number): Promise<StateEntity> {
    const state = await this.stateRepository.findOne(id);
    if (!state)
      throw new NotFoundException(`there is no state with ID ${id}`);

    return await this.stateRepository.remove(state);
  }
}
