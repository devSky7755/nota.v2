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
import { CreateStateDto } from "./dto/state.create-dto";
import { StateService } from "./state.service";
import { StateEntity } from "./entity/state.entity";
import { UpdateStateDto } from "./dto/state.update-dto";
import { DeleteResult, UpdateResult } from "typeorm";

@Controller("states")
export class StateController {
  constructor(private readonly stateService: StateService) { }

  @Get("/")
  findAllStates(): Promise<StateEntity[]> {
    return this.stateService.findAllStates();
  }

  @Get("/:id")
  findState(@Param("id") id: number): Promise<StateEntity> {
    return this.stateService.findStateById(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createState(@Body() state: CreateStateDto): Promise<StateEntity> {
    return this.stateService.createState(state);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateState(@Param("id") id: number, @Body() state: UpdateStateDto): Promise<UpdateResult> {
    return this.stateService.updateStateById(id, state);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteState(@Param("id") id: number): Promise<DeleteResult> {
    return this.stateService.removeStateById(id);
  }
}
