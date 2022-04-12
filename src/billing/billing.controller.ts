import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
  Res,
  BadRequestException,
} from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { AuthGuard } from "@nestjs/passport";
import { CreateBillingDto } from "./dto/billing.create-dto";
import { BillingService } from "./billing.service";
import { BillingEntity } from "./entity/billing.entity";
import { BillingNetAccountEntity } from "./entity/billing.net_account.entity";
import { UpdateBillingDto } from "./dto/billing.update-dto";
import { QBService } from "src/quickbooks/quickbooks.service";

@Controller("net_accounts")
export class BillingNetAccountController {
  constructor(private readonly billingService: BillingService) { }

  @Get("/")
  findAllBillings(): Promise<BillingNetAccountEntity[]> {
    return this.billingService.findAllBillingNAs();
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  findBilling(@Param("id") id: number): Promise<BillingNetAccountEntity> {
    return this.billingService.findBillingNAById(id);
  }
}

@Controller("billings")
export class BillingController {
  constructor(private readonly billingService: BillingService,
    private qbService: QBService,) { }

  @Get("/")
  findAllBillings(): Promise<BillingEntity[]> {
    return this.billingService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  async createBilling(@Body() billing: CreateBillingDto, @Res() res): Promise<void> {
    try {
      // const billingEnt = await this.billingService.createBilling(billing);
      this.qbService.setOAuthUri(JSON.stringify({
        action: 'create_invoice',
        // id: billingEnt?.id
        id: 2
      }))
      console.log(this.qbService.getOAuthUri());
      return res.redirect(this.qbService.getOAuthUri());
    } catch (e) {
      throw e;
    }
  }

  @Get("/:id")
  @UseGuards(AuthGuard("jwt"))
  findBilling(@Param("id") id: number): Promise<BillingEntity> {
    return this.billingService.findBillingById(id);
  }

  @Put("/:id")
  @UseGuards(AuthGuard("jwt"))
  updateBillingById(
    @Param("id") id: number,
    @Body() updateBillingDto: UpdateBillingDto
  ): Promise<BillingEntity> {
    return this.billingService.updateBillingById(id, updateBillingDto);
  }

  @Delete("/:id")
  @UseGuards(AuthGuard("jwt"))
  deleteBilling(@Param("id") billingId: number): Promise<BillingEntity> {
    return this.billingService.removeBillingById(billingId);
  }
}
