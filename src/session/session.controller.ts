import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
  Headers,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateSessionDto } from "./dto/session.create-dto";
import { SessionService } from "./session.service";
import { SessionEntity } from "./entity/session.entity";
import { UpdateSessionDto } from "./dto/session.update-dto";
import { DeleteResult } from "typeorm";
import { LoginSessionDto } from "./dto/session.login-dto";
import { SessionGuard } from "./session.guard";

@Controller("sessions")
export class SessionController {
  constructor(private readonly sessionService: SessionService) { }

  @Post("/login")
  async login(@Body() lsDto: LoginSessionDto): Promise<any> {
    return this.sessionService.loginByPinDigits(lsDto)
  }

  @Post("/refresh-token")
  @UseGuards(SessionGuard)
  async refreshToken(@Headers('Authorization') token: string): Promise<any> {
    return this.sessionService.generateRefreshToken(token?.replace('bearer ', ''))
  }

  @Get("/")
  @UseGuards(SessionGuard)
  findAllSessions(): Promise<SessionEntity[]> {
    return this.sessionService.findAllSessions();
  }

  @Get("/:id")
  @UseGuards(SessionGuard)
  findSession(@Param("id") id: number): Promise<SessionEntity> {
    return this.sessionService.findSessionById(id);
  }

  @Post()
  // @UseGuards(AuthGuard("jwt"))
  @UseGuards(SessionGuard)
  createSession(@Body() session: CreateSessionDto): Promise<SessionEntity> {
    return this.sessionService.createSession(session);
  }

  @Put("/:id")
  // @UseGuards(AuthGuard("jwt"))
  @UseGuards(SessionGuard)
  updateSession(@Param("id") id: number, @Body() session: UpdateSessionDto): Promise<SessionEntity> {
    return this.sessionService.updateSessionById(id, session);
  }

  @Delete("/:id")
  // @UseGuards(AuthGuard("jwt"))
  @UseGuards(SessionGuard)
  deleteSession(@Param("id") id: number): Promise<SessionEntity> {
    return this.sessionService.removeSessionById(id);
  }
}