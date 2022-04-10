import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import OAuthClient = require("intuit-oauth")
import { AccountEntity } from "src/account/entity/account.entity";
import { BillingEntity } from "src/billing/entity/billing.entity";
import { Repository } from "typeorm";

@Injectable()
export class QBService {
  oauthClient: OAuthClient = null;
  oauthUri: string = '';
  private qbApi: string = process.env.QB_SANDBOX_API;

  constructor(
    @InjectRepository(AccountEntity)
    private AccountRepository: Repository<AccountEntity>,
    @InjectRepository(BillingEntity)
    private billingRepository: Repository<BillingEntity>,
  ) {
    this.oauthClient = new OAuthClient({
      clientId: process.env.QB_CLIENT_ID,
      clientSecret: process.env.QB_CLIENT_SECRET,
      environment: process.env.QB_ENVIRONMENT,
      redirectUri: process.env.QB_REDIRECT_URL,
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

  createCustomer = async (realmId: number, accessToken: string, accId: number) => {
    if (!this.oauthClient) return;
    const acc: AccountEntity = await this.AccountRepository.findOne(
      { id: accId },
      { relations: ["state", "billingState", "accType", "status"] }
    );
    if (!acc)
      throw new NotFoundException(`there is no Account with ID ${accId}`);

    try {
      const dispalyName = `${acc.companyName} - ${acc.city}, ${acc.state?.abbr || ''}`;

      const body = {
        "FullyQualifiedName": dispalyName,
        "PrimaryEmailAddr": {
          "Address": acc.email
        },
        "DisplayName": dispalyName,
        "Suffix": "",
        "Title": "",
        "MiddleName": "",
        "Taxable": true,
        "Active": acc.status?.status || false,
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
          "Line2": acc.billingAddressTwo,
          "Country": "USA"
        },
        "ShipAddr": {
          "City": acc.city,
          "Line1": acc.addressOne,
          "Line2": acc.addressTwo,
          "PostalCode": acc.zipCode,
          "CountrySubDivisionCode": acc.state?.abbr,
          "Country": "USA"
        },
      };
      const reqResult = await this.oauthClient
        .makeApiCall({
          url: `${this.qbApi}company/${realmId}/customer?minorversion=63`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify(body),
        });
      const customerID = reqResult.json.Customer.Id;
      await this.AccountRepository.update({ id: accId }, {
        qbCustomerId: customerID
      });
      return { ...acc, qbCustomerId: customerID };
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException();
    }
  }

  updateCustomer = async (realmId: number, accessToken: string, accId: number) => {
    if (!this.oauthClient) return;
    const acc: AccountEntity = await this.AccountRepository.findOne(
      { id: accId },
      { relations: ["state", "billingState", "accType", "status"] }
    );
    if (!acc)
      throw new NotFoundException(`there is no Account with ID ${accId}`);

    const dispalyName = `${acc.companyName} - ${acc.city}, ${acc.state?.abbr || ''}`;

    const body = {
      "FullyQualifiedName": dispalyName,
      "PrimaryEmailAddr": {
        "Address": acc.email
      },
      "DisplayName": dispalyName,
      "Suffix": "",
      "Title": "",
      "MiddleName": "",
      "Taxable": true,
      "Active": acc.status?.status || false,
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
        "Line2": acc.billingAddressTwo,
        "Country": "USA"
      },
      "ShipAddr": {
        "City": acc.city,
        "Line1": acc.addressOne,
        "Line2": acc.addressTwo,
        "PostalCode": acc.zipCode,
        "CountrySubDivisionCode": acc.state?.abbr,
        "Country": "USA"
      },
      "Id": acc.qbCustomerId || null,
      "sparse": true
    };

    try {
      const reqResult = await this.oauthClient
        .makeApiCall({
          url: `${this.qbApi}company/${realmId}/customer?minorversion=63`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify(body),
        });
      if (!acc.qbCustomerId) {
        const customerID = reqResult.json.Customer.Id;
        await this.AccountRepository.update({ id: accId }, {
          qbCustomerId: customerID
        });
        return { ...acc, qbCustomerId: customerID };
      }
      return acc;
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException();
    }
  }

  createItem = async () => {

  }

  createInvoice = async (realmId: number, accessToken: string, accId: number, billingId: number) => {
    if (!this.oauthClient) return;

    const billing = await this.billingRepository.findOne(billingId);
    if (!billing)
      throw new NotFoundException(`there is no Billing with ID ${billingId}`);
    const acc = billing.account;

    if (acc.qbCustomerId) {
      const body = {
        CustomerRef: {
          value: acc.qbCustomerId
        }
      }
      const reqResult = await this.oauthClient
        .makeApiCall({
          url: `${this.qbApi}company/${realmId}/invoice?minorversion=63`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify(body),
        });
      console.log(reqResult)
      return billing;
    } else {
      throw new NotFoundException(`customer is not registered to quickbooks`);
    }
  }
}
