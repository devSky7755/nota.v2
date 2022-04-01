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
import { CreateAssociateDto } from "./dto/associate.create-dto";
import { UpdateAssociateDto } from "./dto/associate.update-dto";
import { AssociateService } from "./associate.service";
import { AssociateEntity } from "./entity/associate.entity";
import { UpdateResult } from "typeorm";

@Controller("associates")
export class AssociateController {
  constructor(private readonly associateService: AssociateService) { }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createAssociate(@Body() client: CreateAssociateDto): Promise<AssociateEntity> {
    return this.associateService.createAssociate(client);
  }

  @Get("/")
  findAllAssociates(): Promise<AssociateEntity[]> {
    return this.associateService.findAllAssociate();
  }

  @Get("/:clientId")
  findAssociateById(@Param("clientId") clientId: number): Promise<AssociateEntity> {
    return this.associateService.findAssociate(clientId);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateAssociateById(
    @Param("id") id: number,
    @Body() updateAssociateDto: UpdateAssociateDto
  ): Promise<UpdateResult> {
    return this.associateService.updateAssociateById(id, updateAssociateDto);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteAssociate(@Param("id") id: number): Promise<AssociateEntity> {
    return this.associateService.removeAssociateById(id);
  }
}
