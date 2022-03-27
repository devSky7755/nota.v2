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
import { CreateMethodDto } from "./dto/method.create-dto";
import { UpdateMethodDto } from "./dto/method.update-dto";
import { MethodService } from "./method.service";
import { MethodEntity } from "./entity/method.entity";
import { DeleteResult } from "typeorm";

@Controller("method_of_ids")
export class MethodController {
  constructor(private readonly methodService: MethodService) { }

  @Get("/")
  @UseGuards(AuthGuard("jwt"))
  findAllMethods(): Promise<MethodEntity[]> {
    return this.methodService.findAllMethods();
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  findMethod(@Param("id") id: number): Promise<MethodEntity> {
    return this.methodService.findMethodById(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createMethod(@Body() method: CreateMethodDto): Promise<MethodEntity> {
    return this.methodService.createMethod(method);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateMethod(@Param("id") id: number, @Body() method: UpdateMethodDto): Promise<MethodEntity> {
    return this.methodService.updateMethodById(id, method);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteMethod(@Param("id") id: number): Promise<DeleteResult> {
    return this.methodService.removeMethodById(id);
  }
}
