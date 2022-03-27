import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { CreateNotaryDetailDto } from "./dto/notary_detail.create-dto";
import { UpdateNotaryDetailDto } from "./dto/notary_detail.update-dto";
import { NotaryDetailEntity } from "./entity/notary_detail.entity";
import { StateEntity } from "src/state/entity/state.entity";
import { UserEntity } from "src/user/entity/user.entity";

@Injectable()
export class NotaryDetailService {
  constructor(
    @InjectRepository(NotaryDetailEntity)
    private notary_detailRepository: Repository<NotaryDetailEntity>,
    @InjectRepository(StateEntity)
    private stateRepository: Repository<StateEntity>
  ) { }

  async findAllNotaryDetails(): Promise<NotaryDetailEntity[]> {
    return await this.notary_detailRepository.find();
  }

  async findNotaryDetailById(id: number): Promise<NotaryDetailEntity> {
    return await this.notary_detailRepository.findOne({ id });
  }

  async createNotaryDetail(notary_detail: CreateNotaryDetailDto, user: UserEntity): Promise<NotaryDetailEntity> {
    const {
      comState,
      ...dto
    } = notary_detail;
    return await this.notary_detailRepository.save({
      comState: await this.stateRepository.findOne({
        id: comState
      }),
      user,
      ...dto,
    });
  }

  async updateNotaryDetailById(id: number, updateNotaryDetailDto: UpdateNotaryDetailDto, user: UserEntity): Promise<NotaryDetailEntity> {
    const notary_detail = await this.notary_detailRepository.findOne(id);
    if (!notary_detail)
      throw new NotFoundException(`there is no notary_detail with ID ${id}`);

    const {
      comState,
      ...dto
    } = updateNotaryDetailDto;

    if (comState) {
      dto['comState'] = await this.stateRepository.findOne({ id: comState })
    }

    return await this.notary_detailRepository.save(plainToClass(NotaryDetailEntity, { user, ...notary_detail, ...dto }));
  }

  async removeNotaryDetailById(id: number): Promise<DeleteResult> {
    return await this.notary_detailRepository.delete({ id });
  }
}
