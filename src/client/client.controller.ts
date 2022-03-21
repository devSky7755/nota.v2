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
import { CreateClientDto } from "./dto/client.create-dto";
import { ClientService } from "./client.service";
import { ClientEntity } from "./entity/client.entity";

@Controller("clients")
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createClient(@Body() client: CreateClientDto): Promise<ClientEntity> {
    return this.clientService.createClient(client);
  }

  @Get("/")
  findAllClient(): Promise<ClientEntity[]> {
    return this.clientService.findAllClient();
  }

  @Get("/:clientId")
  findClient(@Param("clientId") clientId: number): Promise<ClientEntity> {
    return this.clientService.findClient(clientId);
  }
}
