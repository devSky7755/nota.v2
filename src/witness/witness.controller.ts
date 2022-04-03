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
import { CreateWitnessDto } from "./dto/witness.create-dto";
import { WitnessService } from "./witness.service";
import { WitnessEntity } from "./entity/witness.entity";
import { UpdateWitnessDto } from "./dto/witness.update-dto";

@Controller("witnesses")
export class WitnessController {
  constructor(private readonly witnessService: WitnessService) { }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createWitness(@Body() client: CreateWitnessDto): Promise<WitnessEntity> {
    return this.witnessService.createWitness(client);
  }

  @Get("/")
  findAllWitnesses(): Promise<WitnessEntity[]> {
    return this.witnessService.findAllWitness();
  }

  @Get("/:id")
  findWitness(@Param("id") id: number): Promise<WitnessEntity> {
    return this.witnessService.findWitness(id);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateWitnessById(
    @Param("id") id: number,
    @Body() updateWitnessDto: UpdateWitnessDto
  ): Promise<WitnessEntity> {
    return this.witnessService.updateWitnessById(id, updateWitnessDto);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteWitness(@Param("id") id: number): Promise<WitnessEntity> {
    return this.witnessService.removeWitnessById(id);
  }
}
