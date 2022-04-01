import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
  Headers,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "./dto/user.create-dto";
import { LoginUserDto } from "./dto/user.login-dto";
import { UpdateUserDto } from "./dto/user.update-dto";
import { UserEntity } from "./entity/user.entity";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  createUser(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(user);
  }

  @Post("/login")
  @UseGuards(AuthGuard("local"))
  async login(@Request() req): Promise<LoginUserDto> {
    return this.userService.login(req.user);
  }

  @Get("/logout")
  @UseGuards(AuthGuard("jwt"))
  async logout(@Headers('Authorization') auth: string): Promise<any> {
    return this.userService.logout(auth);
  }

  @Get("/")
  findUserList(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get("/search")
  findUserByEmail(@Query("email") email: string): Promise<UserEntity> {
    return this.userService.findUserByEmail(email);
  }

  @Get("/:userId")
  findUserById(@Param("userId") userId: number): Promise<UserEntity> {
    return this.userService.findUserById(userId);
  }

  @Patch()
  @UseGuards(AuthGuard("jwt"))
  updateUserById(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    return this.userService.updateUserById(req.user.id, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard("jwt"))
  deleteUser(@Request() req): Promise<UserEntity> {
    return this.userService.removeUserById(req.user.id);
  }
}
