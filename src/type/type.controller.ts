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
import { CreateTypeDto } from "./dto/type.create-dto";
import { TypeService } from "./type.service";
import { TypeEntity } from "./entity/type.entity";
import { UpdateTypeDto } from "./dto/type.update-dto";
import { DeleteResult } from "typeorm";

@Controller("types_of_notarizations")
export class TypeController {
  constructor(private readonly typeService: TypeService) { }

  @Get("/")
  @UseGuards(AuthGuard("jwt"))
  findAllTypes(): Promise<TypeEntity[]> {
    return this.typeService.findAllTypes();
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  findType(@Param("id") id: number): Promise<TypeEntity> {
    return this.typeService.findTypeById(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createType(@Body() types_of_notarization: CreateTypeDto): Promise<TypeEntity> {
    return this.typeService.createType(types_of_notarization);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateType(@Param("id") id: number, @Body() types_of_notarization: UpdateTypeDto): Promise<TypeEntity> {
    return this.typeService.updateTypeById(id, types_of_notarization);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteType(@Param("id") id: number): Promise<TypeEntity> {
    return this.typeService.removeTypeById(id);
  }
}
