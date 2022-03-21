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
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UpdateResult } from "typeorm";
import { CreateAccountDto } from "./dto/account.create-dto";
import { UpdateAccountDto } from "./dto/account.update-dto";
import { AccountEntity } from "./entity/account.entity";
import { AccountService } from "./account.service";

@Controller("accounts")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  createAccount(@Body() user: CreateAccountDto): Promise<AccountEntity> {
    return this.accountService.createAccount(user);
  }

  @Get("/:userId")
  findUserById(@Param("accountId") accountId: number): Promise<AccountEntity> {
    return this.accountService.findAccountById(accountId);
  }

  @Patch()
  @UseGuards(AuthGuard("jwt"))
  updateUserById(
    @Request() req,
    @Body() updateAccountDto: UpdateAccountDto
  ): Promise<UpdateResult> {
    return this.accountService.updateAccountById(req.user.id, updateAccountDto);
  }

  @Delete()
  @UseGuards(AuthGuard("jwt"))
  deleteUser(@Request() req): Promise<void> {
    return this.accountService.removeAccountById(req.user.id);
  }
}
