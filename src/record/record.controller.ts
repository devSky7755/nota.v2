import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateRecordDto } from "./dto/record.create-dto";
import { RecordService } from "./record.service";
import { RecordEntity } from "./entity/record.entity";
import { UpdateRecordDto } from "./dto/record.update-dto";
import { DeleteResult } from "typeorm";

@Controller("records")
export class RecordController {
  constructor(private readonly recordService: RecordService) { }

  @Get("/")
  @UseGuards(AuthGuard("jwt"))
  findRecordByUser(@Request() req): Promise<RecordEntity[]> {
    return this.recordService.findRecordByUser(req.user);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createRecord(@Request() req, @Body() record: CreateRecordDto): Promise<RecordEntity> {
    return this.recordService.createRecord(record, req.user);
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  findRecord(@Param("id") id: number): Promise<RecordEntity> {
    return this.recordService.findRecordById(id);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateRecord(@Param("id") id: number, @Body() record: UpdateRecordDto): Promise<RecordEntity> {
    return this.recordService.updateRecordById(id, record);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteRecord(@Param("id") id: number): Promise<DeleteResult> {
    return this.recordService.removeRecordById(id);
  }
}
