import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateRoleDto } from "./dto/role.create-dto";
import { UpdateRoleDto } from "./dto/role.update-dto";
import { RoleEntity } from "./entity/role.entity";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>
  ) { }

  async findAllRoles(): Promise<RoleEntity[]> {
    return await this.roleRepository.find();
  }

  async findRoleById(id: number): Promise<RoleEntity> {
    return await this.roleRepository.findOne({ id });
  }

  async createRole(role: CreateRoleDto): Promise<RoleEntity> {
    return await this.roleRepository.save({
      ...role,
    });
  }

  async updateRoleById(id: number, roleDto: UpdateRoleDto): Promise<UpdateResult> {
    const role = await this.roleRepository.findOne(id);
    if (!role)
      throw new NotFoundException(`there is no role with ID ${id}`);

    return await this.roleRepository.update({ id }, roleDto);
  }

  async removeRoleById(id: number): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne(id);
    if (!role)
      throw new NotFoundException(`there is no role with ID ${id}`);

    return await this.roleRepository.remove(role);
  }
}
