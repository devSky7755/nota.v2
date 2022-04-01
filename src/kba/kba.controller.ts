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
import { CreateKbaDto } from "./dto/kba.create-dto";
import { KbaService } from "./kba.service";
import { KbaEntity } from "./entity/kba.entity";
import { UpdateKbaDto } from "./dto/kba.update-dto";
import { DeleteResult } from "typeorm";

@Controller("kbas")
export class KbaController {
  constructor(private readonly kbaService: KbaService) { }

  @Get("/")
  @UseGuards(AuthGuard("jwt"))
  findAllKbas(): Promise<KbaEntity[]> {
    return this.kbaService.findAllKbas();
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  findKba(@Param("id") id: number): Promise<KbaEntity> {
    return this.kbaService.findKbaById(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createKba(@Body() kba: CreateKbaDto): Promise<KbaEntity> {
    return this.kbaService.createKba(kba);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateKba(@Param("id") id: number, @Body() kba: UpdateKbaDto): Promise<KbaEntity> {
    return this.kbaService.updateKbaById(id, kba);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteKba(@Param("id") id: number): Promise<KbaEntity> {
    return this.kbaService.removeKbaById(id);
  }
}
