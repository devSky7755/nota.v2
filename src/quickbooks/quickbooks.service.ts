import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import OAuthClient = require("intuit-oauth")
import { async } from "rxjs";
import { AccountEntity } from "src/account/entity/account.entity";
import { Repository } from "typeorm";

@Injectable()
export class QBService {
  oauthClient: OAuthClient = null;
  oauthUri: string = '';
  private qbApi: string = process.env.QB_SANDBOX_API;

  constructor(
    @InjectRepository(AccountEntity)
    private AccountRepository: Repository<AccountEntity>,
  ) {
    this.oauthClient = new OAuthClient({
      clientId: process.env.QB_CLIENT_ID,
      clientSecret: process.env.QB_CLIENT_SECRET,
      environment: 'sandbox',
      redirectUri: 'http://localhost:3000/callback',
      logging: true
    });
  }

  getOAuthClient(): OAuthClient {
    return this.oauthClient;
  }

  setOAuthUri(state) {
    this.oauthUri = this.oauthClient.authorizeUri({
      scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
      state
    });
  }

  getOAuthUri(): string | null {
    return this.oauthUri;
  }

  getCustomerByDisplayName = async (dispalyName: string, realmId: number, accessToken: string) => {
    const query = `select * from Customer Where DisplayName = '${dispalyName}'`;

    return await this.oauthClient
      .makeApiCall({
        url: `${this.qbApi}company/${realmId}/query?query=${query}&minorversion=63`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
  }

  createCustomer = async (realmId: number, accId: number, accessToken: string) => {
    if (!this.oauthClient) return;
    const acc: AccountEntity = await this.AccountRepository.findOne(
      { id: accId },
      { relations: ["state", "billingState", "accType", "status"] }
    );
    if (!acc)
      throw new NotFoundException(`there is no Account with ID ${accId}`);

    try {
      const body = {
        "FullyQualifiedName": `${acc.firstName} - ${acc.companyName}`,
        "PrimaryEmailAddr": {
          "Address": acc.email
        },
        "DisplayName": `${acc.firstName} - ${acc.companyName}`,
        "Suffix": "Jr",
        "Title": acc.firstName,
        "MiddleName": "",
        "FamilyName": acc.lastName,
        "GivenName": acc.firstName,
        "PrimaryPhone": {
          "FreeFormNumber": acc.phone
        },
        "CompanyName": acc.companyName,
        "BillAddr": {
          "CountrySubDivisionCode": acc.billingState?.abbr,
          "City": acc.billingCity,
          "PostalCode": acc.billingZipCode,
          "Line1": acc.billingAddressOne,
          "Country": acc.billingAddressTwo
        },
      };
      await this.oauthClient
        .makeApiCall({
          url: `${this.qbApi}company/${realmId}/customer?minorversion=63`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify(body),
        });
      return acc;
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException();
    }
  }

  updateCustomer = async (realmId: number, accId: number, accessToken: string) => {
    if (!this.oauthClient) return;
    const acc: AccountEntity = await this.AccountRepository.findOne(
      { id: accId },
      { relations: ["state", "billingState", "accType", "status"] }
    );
    if (!acc)
      throw new NotFoundException(`there is no Account with ID ${accId}`);

    const dispalyName = `${acc.firstName} - ${acc.companyName}`;
    const qbCustomerRes: any = await this.getCustomerByDisplayName(dispalyName, realmId, accessToken);
    const parsedResBody = JSON.parse(qbCustomerRes.response.body);
    const customers = parsedResBody?.QueryResponse?.Customer;
    if (customers && customers?.length > 0) {
      const customer = customers[0];
      try {
        const body = {
          "FullyQualifiedName": dispalyName,
          "PrimaryEmailAddr": {
            "Address": acc.email
          },
          "DisplayName": dispalyName,
          "Suffix": "Jr",
          "Title": acc.firstName,
          "MiddleName": "",
          "FamilyName": acc.lastName,
          "GivenName": acc.firstName,
          "PrimaryPhone": {
            "FreeFormNumber": acc.phone
          },
          "CompanyName": acc.companyName,
          "BillAddr": {
            "CountrySubDivisionCode": acc.billingState?.abbr,
            "City": acc.billingCity,
            "PostalCode": acc.billingZipCode,
            "Line1": acc.billingAddressOne,
            "Country": acc.billingAddressTwo
          },
          "Id": customer.Id,
          "sparse": true
        };
        await this.oauthClient
          .makeApiCall({
            url: `${this.qbApi}company/${realmId}/customer?minorversion=63`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(body),
          });
        return acc;
      } catch (error) {
        console.log('error', error);
        throw new UnauthorizedException();
      }
    } else {
      throw new NotFoundException(`there is no Customer with DisplayName ${dispalyName}`);
    }
  }
}
