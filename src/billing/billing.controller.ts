import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateBillingDto } from "./dto/billing.create-dto";
import { BillingService } from "./billing.service";
import { BillingEntity } from "./entity/billing.entity";

@Controller("billings")
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  createBilling(@Body() billing: CreateBillingDto): Promise<BillingEntity> {
    return this.billingService.createBilling(billing);
  }

  @Get("/")
  findAllBilling(): Promise<BillingEntity[]> {
    return this.billingService.findAllBilling();
  }

  @Get("/:postId")
  findBilling(@Param("postId") postId: number): Promise<BillingEntity> {
    return this.billingService.findBilling(postId);
  }
}
