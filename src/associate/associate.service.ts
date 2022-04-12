import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { StateEntity } from "src/state/entity/state.entity";
import { Repository, UpdateResult } from "typeorm";
import { CreateAssociateDto } from "./dto/associate.create-dto";
import { UpdateAssociateDto } from "./dto/associate.update-dto";
import { AssociateEntity } from "./entity/associate.entity";

@Injectable()
export class AssociateService {
  constructor(
    @InjectRepository(AssociateEntity)
    private associateRepository: Repository<AssociateEntity>,
    @InjectRepository(StateEntity)
    private StateRepository: Repository<StateEntity>,
  ) { }

  async createAssociate(associate: CreateAssociateDto): Promise<AssociateEntity> {
    const {
      state,
      ...dto
    } = associate;
    return await this.associateRepository.save({
      state: await this.StateRepository.findOne({
        id: state,
      }),
      ...dto
    });
  }

  async findAllAssociate(): Promise<AssociateEntity[]> {
    return await this.associateRepository.find();
  }

  async findAssociate(associateId: number): Promise<AssociateEntity> {
    return await this.associateRepository.findOne({ id: associateId });
  }

  async updateAssociateById(
    associateId: number,
    updateAssociateDto: UpdateAssociateDto
  ): Promise<UpdateResult> {
    const associate = await this.associateRepository.findOne(associateId);
    if (!associate)
      throw new NotFoundException(`there is no associate with ID ${associateId}`);
    const {
      state,
      ...dto
    } = updateAssociateDto;

    if (state) {
      dto['state'] = await this.StateRepository.findOne({ id: state })
    }
    return await this.associateRepository.update(associateId, { ...associate, ...dto });
  }

  async removeAssociateById(id: number): Promise<AssociateEntity> {
    const associate = await this.associateRepository.findOne(id);
    if (!associate)
      throw new NotFoundException(`there is no associate with ID ${id}`);
    return await this.associateRepository.remove(associate);
  }
}
