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
import { DocActionService, DocService, DocStatusService } from "./doc.service";
import { DocEntity } from "./entity/doc.entity";
import { DocActionEntity } from "./entity/doc.action.entity";
import { DocStatusEntity } from "./entity/doc.status.entity";
import { UpdateDocDto } from "./dto/doc.update-dto";
import { DeleteResult, UpdateResult } from "typeorm";
import { UpdateDocActionDto } from "./dto/doc.action.update-dto";
import { CreateDocActionDto } from "./dto/doc.action.create-dto";
import { UpdateDocStatusDto } from "./dto/doc.status.update-dto";
import { CreateDocStatusDto } from "./dto/doc.status.create-dto";

@Controller("doc-actions")
export class DocActionController {
  constructor(private readonly docActionService: DocActionService) { }

  @Get("/")
  findAll(): Promise<DocActionEntity[]> {
    return this.docActionService.findAll();
  }

  @Get("/:id")
  findById(@Param("id") id: number): Promise<DocActionEntity> {
    return this.docActionService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createDoc(@Body() docAction: CreateDocActionDto): Promise<DocActionEntity> {
    return this.docActionService.create(docAction);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateDoc(@Param("id") id: number, @Body() docAction: UpdateDocActionDto): Promise<UpdateResult> {
    return this.docActionService.updateById(id, docAction);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteDoc(@Param("id") id: number): Promise<DeleteResult> {
    return this.docActionService.removeById(id);
  }
}

@Controller("doc-statuses")
export class DocStatusController {
  constructor(private readonly docStatusService: DocStatusService) { }

  @Get("/")
  findAll(): Promise<DocStatusEntity[]> {
    return this.docStatusService.findAll();
  }

  @Get("/:id")
  findById(@Param("id") id: number): Promise<DocStatusEntity> {
    return this.docStatusService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createDoc(@Body() docStatus: CreateDocStatusDto): Promise<DocStatusEntity> {
    return this.docStatusService.create(docStatus);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateDoc(@Param("id") id: number, @Body() docStatus: UpdateDocStatusDto): Promise<UpdateResult> {
    return this.docStatusService.updateById(id, docStatus);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteDoc(@Param("id") id: number): Promise<DeleteResult> {
    return this.docStatusService.removeById(id);
  }
}

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
  updateDoc(@Param("id") id: number, @Body() doc: UpdateDocDto): Promise<DocEntity> {
    return this.docService.updateDocById(id, doc);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteDoc(@Param("id") id: number): Promise<DocEntity> {
    return this.docService.removeDocById(id);
  }
}
