import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StateEntity } from "src/state/entity/state.entity";
import { Repository } from "typeorm";
import { CreateAssociateDto } from "./dto/associate.create-dto";
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
      firstName,
      lastName,
      addressOne,
      addressTwo,
      city,
      state,
      zipCode,
      phone,
      email,
      dob
    } = associate;
    return await this.associateRepository.save({
      firstName,
      lastName,
      addressOne,
      addressTwo,
      city,
      state: await this.StateRepository.findOne({
        id: state,
      }),
      zipCode,
      phone,
      email,
      dob
    });
  }

  async findAllAssociate(): Promise<AssociateEntity[]> {
    return await this.associateRepository.find();
  }

  async findAssociate(associateId: number): Promise<AssociateEntity> {
    return await this.associateRepository.findOne({ id: associateId });
  }
}
