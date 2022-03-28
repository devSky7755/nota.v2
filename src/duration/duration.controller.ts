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
import { CreateDurationDto } from "./dto/duration.create-dto";
import { DurationService } from "./duration.service";
import { DurationEntity } from "./entity/duration.entity";
import { UpdateDurationDto } from "./dto/duration.update-dto";
import { DeleteResult } from "typeorm";

@Controller("acc_types")
export class DurationController {
  constructor(private readonly durationService: DurationService) { }

  @Get("/")
  @UseGuards(AuthGuard("jwt"))
  findAllDurations(): Promise<DurationEntity[]> {
    return this.durationService.findAllDurations();
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  findDuration(@Param("id") id: number): Promise<DurationEntity> {
    return this.durationService.findDurationById(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createDuration(@Body() durations: CreateDurationDto): Promise<DurationEntity> {
    return this.durationService.createDuration(durations);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateDuration(@Param("id") id: number, @Body() durations: UpdateDurationDto): Promise<DurationEntity> {
    return this.durationService.updateDurationById(id, durations);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteDuration(@Param("id") id: number): Promise<DeleteResult> {
    return this.durationService.removeDurationById(id);
  }
}
