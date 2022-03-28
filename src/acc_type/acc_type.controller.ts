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
import { CreateAccTypeDto } from "./dto/acc_type.create-dto";
import { AccTypeService } from "./acc_type.service";
import { AccTypeEntity } from "./entity/acc_type.entity";
import { UpdateAccTypeDto } from "./dto/acc_type.update-dto";
import { DeleteResult } from "typeorm";

@Controller("acc_types")
export class AccTypeController {
  constructor(private readonly accTypeService: AccTypeService) { }

  @Get("/")
  @UseGuards(AuthGuard("jwt"))
  findAllAccTypes(): Promise<AccTypeEntity[]> {
    return this.accTypeService.findAllAccTypes();
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  findAccType(@Param("id") id: number): Promise<AccTypeEntity> {
    return this.accTypeService.findAccTypeById(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createAccType(@Body() accTypes: CreateAccTypeDto): Promise<AccTypeEntity> {
    return this.accTypeService.createAccType(accTypes);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateAccType(@Param("id") id: number, @Body() accTypes: UpdateAccTypeDto): Promise<AccTypeEntity> {
    return this.accTypeService.updateAccTypeById(id, accTypes);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteAccType(@Param("id") id: number): Promise<DeleteResult> {
    return this.accTypeService.removeAccTypeById(id);
  }
}
