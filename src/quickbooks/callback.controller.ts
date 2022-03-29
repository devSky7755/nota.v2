import {
  Controller,
  Get,
  Query,
  Request,
} from "@nestjs/common";

import { QBService } from "src/quickbooks/quickbooks.service";

@Controller("callback")
export class QBCallBackController {
  constructor(private qbService: QBService) { }

  @Get("/")
  async callback(@Request() req,
    @Query('state') state: string,
  ) {
    const parsedState = JSON.parse(state);
    const token: any = await this.qbService.getOAuthClient().createToken(req.url)
    switch (parsedState.action) {
      case 'create_customer':
        return await this.qbService.createCustomer(token?.token?.realmId, parsedState.id, token?.token?.access_token)
      case 'update_customer':
        return await this.qbService.updateCustomer(token?.token?.realmId, parsedState.id, token?.token?.access_token)
      default:
        break;
    }
  }
}
