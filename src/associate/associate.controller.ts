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
import { CreateAssociateDto } from "./dto/associate.create-dto";
import { AssociateService } from "./associate.service";
import { AssociateEntity } from "./entity/associate.entity";

@Controller("clients")
export class AssociateController {
  constructor(private readonly clientService: AssociateService) { }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createAssociate(@Body() client: CreateAssociateDto): Promise<AssociateEntity> {
    return this.clientService.createAssociate(client);
  }

  @Get("/")
  findAllAssociate(): Promise<AssociateEntity[]> {
    return this.clientService.findAllAssociate();
  }

  @Get("/:clientId")
  findAssociate(@Param("clientId") clientId: number): Promise<AssociateEntity> {
    return this.clientService.findAssociate(clientId);
  }
}
