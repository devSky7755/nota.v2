import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateRoleDto } from "./dto/role.create-dto";
import { RoleService } from "./role.service";
import { RoleEntity } from "./entity/role.entity";
import { UpdateRoleDto } from "./dto/role.update-dto";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller("roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get("/")
  findAllRoles(): Promise<RoleEntity[]> {
    return this.roleService.findAllRoles();
  }

  @Get("/:id")
  findRole(@Param("id") id: number): Promise<RoleEntity> {
    return this.roleService.findRoleById(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createRole(@Body() role: CreateRoleDto): Promise<RoleEntity> {
    return this.roleService.createRole(role);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateRole(@Param("id") id: number, @Body() role: UpdateRoleDto): Promise<UpdateResult> {
    return this.roleService.updateRoleById(id, role);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteRole(@Param("id") id: number): Promise<DeleteResult> {
    return this.roleService.removeRoleById(id);
  }
}
