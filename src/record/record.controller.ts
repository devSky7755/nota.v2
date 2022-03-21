import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateRecordDto } from "./dto/record.create-dto";
import { RecordService } from "./record.service";
import { RecordEntity } from "./entity/record.entity";

@Controller("records")
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createRecord(@Body() record: CreateRecordDto): Promise<RecordEntity> {
    return this.recordService.createRecord(record);
  }

  @Get("/")
  findAllRecord(): Promise<RecordEntity[]> {
    return this.recordService.findAllRecord();
  }

  @Get("/loginList")
  @UseGuards(AuthGuard("jwt"))
  findLoginedAllRecord(@Request() req): Promise<RecordEntity[]> {
    return this.recordService.findLoginedAllRecord(req.user);
  }

  @Get("/:postId")
  findRecord(@Param("postId") postId: number): Promise<RecordEntity> {
    return this.recordService.findRecord(postId);
  }
}
