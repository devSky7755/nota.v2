import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
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

  async updateStateById(id: number, state: UpdateStateDto): Promise<UpdateResult> {
    return await this.stateRepository.update({ id }, state);
  }

  async removeStateById(id: number): Promise<DeleteResult> {
    return await this.stateRepository.delete({ id });
  }
}
