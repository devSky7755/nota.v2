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
import { CreateDocDto } from "./dto/doc.create-dto";
import { DocService } from "./doc.service";
import { DocEntity } from "./entity/doc.entity";
import { UpdateDocDto } from "./dto/doc.update-dto";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller("docs")
export class DocController {
  constructor(private readonly docService: DocService) { }

  @Get("/")
  findAllDocs(): Promise<DocEntity[]> {
    return this.docService.findAllDocs();
  }

  @Get("/:id")
  findDoc(@Param("id") id: number): Promise<DocEntity> {
    return this.docService.findDocById(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createDoc(@Body() doc: CreateDocDto): Promise<DocEntity> {
    return this.docService.createDoc(doc);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateDoc(@Param("id") id: number, @Body() doc: UpdateDocDto): Promise<UpdateResult> {
    return this.docService.updateDocById(id, doc);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteDoc(@Param("id") id: number): Promise<DeleteResult> {
    return this.docService.removeDocById(id);
  }
}
