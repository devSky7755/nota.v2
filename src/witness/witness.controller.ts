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
import { CreateWitnessDto } from "./dto/witness.create-dto";
import { WitnessService } from "./witness.service";
import { WitnessEntity } from "./entity/witness.entity";

@Controller("clients")
export class WitnessController {
  constructor(private readonly clientService: WitnessService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createWitness(@Body() client: CreateWitnessDto): Promise<WitnessEntity> {
    return this.clientService.createWitness(client);
  }

  @Get("/")
  findAllWitness(): Promise<WitnessEntity[]> {
    return this.clientService.findAllWitness();
  }

  @Get("/:clientId")
  findWitness(@Param("clientId") clientId: number): Promise<WitnessEntity> {
    return this.clientService.findWitness(clientId);
  }
}
