import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Put,
  Res,
  BadRequestException,
} from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { CreateAccountDto } from "./dto/account.create-dto";
import { UpdateAccountDto } from "./dto/account.update-dto";
import { AccountEntity } from "./entity/account.entity";
import { AccountService } from "./account.service";
import { QBService } from "src/quickbooks/quickbooks.service";

@Controller("accounts")
export class AccountController {
  constructor(private readonly accountService: AccountService,
    private qbService: QBService,) { }

  @Get("/")
  findAllAccounts(): Promise<AccountEntity[]> {
    return this.accountService.findAll();
  }

  @Post()
  async createAccount(@Body() account: CreateAccountDto, @Res() res) {
    const accEnt: any = await this.accountService.createAccount(account);
    if (accEnt) {
      this.qbService.setOAuthUri(JSON.stringify({
        action: 'create_customer',
        id: accEnt?.id
      }))
      console.log(this.qbService.getOAuthUri());
      return res.redirect(this.qbService.getOAuthUri());
    }
    else
      throw new BadRequestException();
  }

  @Get("/:id")
  findAccountById(@Param("id") accountId: number): Promise<AccountEntity> {
    return this.accountService.findAccountById(accountId);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  async updateAccountById(
    @Param("id") accountId: number,
    @Body() updateAccountDto: UpdateAccountDto, @Res() res
  ): Promise<void> {
    try {
      await this.accountService.updateAccountById(accountId, updateAccountDto);
    } catch (e) {
      throw e;
    }
    this.qbService.setOAuthUri(JSON.stringify({
      action: 'update_customer',
      id: accountId
    }))
    console.log(this.qbService.getOAuthUri());
    return res.redirect(this.qbService.getOAuthUri());
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteAccount(@Param("id") accountId: number): Promise<AccountEntity> {
    return this.accountService.removeAccountById(accountId);
  }
}
