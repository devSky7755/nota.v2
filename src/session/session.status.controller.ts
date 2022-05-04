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
import { SessionGuard } from "./session.guard";
import { CreateSessionStatusDto } from "./dto/session.status.create-dto";
import { UpdateSessionStatusDto } from "./dto/session.status.update-dto";
import { SessionStatusService } from "./session.status.service";
import { SessionStatusEntity } from "./entity/session.status.entity";

@Controller("session-statuses")
export class SessionStatusController {
  constructor(private readonly sessionStatusService: SessionStatusService) { }

  @Get("/")
  findAll(): Promise<SessionStatusEntity[]> {
    return this.sessionStatusService.findAll();
  }

  @Get("/:id")
  findSession(@Param("id") id: number): Promise<SessionStatusEntity> {
    return this.sessionStatusService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  // @UseGuards(SessionGuard)
  createSession(@Body() session: CreateSessionStatusDto): Promise<SessionStatusEntity> {
    return this.sessionStatusService.createSessionStatus(session);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  // @UseGuards(SessionGuard)
  updateSession(@Param("id") id: number, @Body() session: UpdateSessionStatusDto): Promise<SessionStatusEntity> {
    return this.sessionStatusService.updateSessionStatusById(id, session);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  // @UseGuards(SessionGuard)
  deleteSession(@Param("id") id: number): Promise<SessionStatusEntity> {
    return this.sessionStatusService.removeSessionStatusById(id);
  }
}