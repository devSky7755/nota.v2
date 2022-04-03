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
import { CreateSessionDto } from "./dto/session.create-dto";
import { SessionService } from "./session.service";
import { SessionEntity } from "./entity/session.entity";
import { UpdateSessionDto } from "./dto/session.update-dto";
import { DeleteResult } from "typeorm";

@Controller("sessions")
export class SessionController {
  constructor(private readonly sessionService: SessionService) { }

  @Get("/")
  findAllSessions(): Promise<SessionEntity[]> {
    return this.sessionService.findAllSessions();
  }

  @Get("/:id")
  findSession(@Param("id") id: number): Promise<SessionEntity> {
    return this.sessionService.findSessionById(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createSession(@Body() session: CreateSessionDto): Promise<SessionEntity> {
    return this.sessionService.createSession(session);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateSession(@Param("id") id: number, @Body() session: UpdateSessionDto): Promise<SessionEntity> {
    return this.sessionService.updateSessionById(id, session);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteSession(@Param("id") id: number): Promise<SessionEntity> {
    return this.sessionService.removeSessionById(id);
  }
}
