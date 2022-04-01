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
import { CreateClientDto } from "./dto/client.create-dto";
import { UpdateClientDto } from "./dto/client.update-dto";
import { ClientService } from "./client.service";
import { ClientEntity } from "./entity/client.entity";
import { DeleteResult } from "typeorm";

@Controller("clients")
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Get("/")
  findAllClient(): Promise<ClientEntity[]> {
    return this.clientService.findAllClients();
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createClient(@Body() client: CreateClientDto): Promise<ClientEntity> {
    return this.clientService.createClient(client);
  }

  @Get("/:clientId")
  findClient(@Param("clientId") clientId: number): Promise<ClientEntity> {
    return this.clientService.findClientById(clientId);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateClientById(
    @Param("id") clientId: number,
    @Body() updateAccountDto: UpdateClientDto
  ): Promise<ClientEntity> {
    return this.clientService.updateClientById(clientId, updateAccountDto);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteClient(@Param("id") clientId: number): Promise<ClientEntity> {
    return this.clientService.removeClientById(clientId);
  }
}
