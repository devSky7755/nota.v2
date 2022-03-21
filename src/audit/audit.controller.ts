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
import { CreateAuditDto } from "./dto/audit.create-dto";
import { AuditService } from "./audit.service";
import { AuditEntity } from "./entity/audit.entity";

@Controller("clients")
export class AuditController {
  constructor(private readonly clientService: AuditService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createAudit(@Body() client: CreateAuditDto): Promise<AuditEntity> {
    return this.clientService.createAudit(client);
  }

  @Get("/")
  findAllAudit(): Promise<AuditEntity[]> {
    return this.clientService.findAllAudit();
  }

  @Get("/:clientId")
  findAudit(@Param("clientId") clientId: number): Promise<AuditEntity> {
    return this.clientService.findAudit(clientId);
  }
}
