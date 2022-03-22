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
  Put,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DeleteResult, UpdateResult } from "typeorm";
import { CreateAccountDto } from "./dto/account.create-dto";
import { UpdateAccountDto } from "./dto/account.update-dto";
import { AccountEntity } from "./entity/account.entity";
import { AccountService } from "./account.service";

@Controller("accounts")
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Get("/")
  findAllAccounts(): Promise<AccountEntity[]> {
    return this.accountService.findAll();
  }

  @Post()
  createAccount(@Body() user: CreateAccountDto): Promise<AccountEntity> {
    return this.accountService.createAccount(user);
  }

  @Get("/:id")
  findUserById(@Param("id") accountId: number): Promise<AccountEntity> {
    return this.accountService.findAccountById(accountId);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateUserById(
    @Param("id") accountId: number,
    @Body() updateAccountDto: UpdateAccountDto
  ): Promise<UpdateResult> {
    return this.accountService.updateAccountById(accountId, updateAccountDto);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteUser(@Param("id") accountId: number): Promise<DeleteResult> {
    return this.accountService.removeAccountById(accountId);
  }
}
