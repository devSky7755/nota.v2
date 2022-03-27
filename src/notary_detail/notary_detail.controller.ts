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
import { CreateNotaryDetailDto } from "./dto/notary_detail.create-dto";
import { NotaryDetailService } from "./notary_detail.service";
import { NotaryDetailEntity } from "./entity/notary_detail.entity";
import { UpdateNotaryDetailDto } from "./dto/notary_detail.update-dto";
import { DeleteResult } from "typeorm";

@Controller("notary_details")
export class NotaryDetailController {
  constructor(private readonly notaryDetailService: NotaryDetailService) { }

  @Get("/")
  @UseGuards(AuthGuard("jwt"))
  findAllNotaryDetails(): Promise<NotaryDetailEntity[]> {
    return this.notaryDetailService.findAllNotaryDetails();
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  findNotaryDetail(@Param("id") id: number): Promise<NotaryDetailEntity> {
    return this.notaryDetailService.findNotaryDetailById(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createNotaryDetail(@Request() req, @Body() notary_detail: CreateNotaryDetailDto): Promise<NotaryDetailEntity> {
    return this.notaryDetailService.createNotaryDetail(notary_detail, req.user);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateNotaryDetail(@Param("id") id: number, @Request() req, @Body() notary_detail: UpdateNotaryDetailDto): Promise<NotaryDetailEntity> {
    return this.notaryDetailService.updateNotaryDetailById(id, notary_detail, req.user);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteNotaryDetail(@Param("id") id: number): Promise<DeleteResult> {
    return this.notaryDetailService.removeNotaryDetailById(id);
  }
}
