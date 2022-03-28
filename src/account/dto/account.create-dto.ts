import { IsString, IsBoolean, IsNumber, IsBase64, IsEmail } from "class-validator";
import { UniqueOnDatabase } from "src/providers/unique-validation";
import { AccountEntity } from "../entity/account.entity";

export class CreateAccountDto {
  @IsString()
  readonly companyName: string;
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @IsString()
  readonly addressOne: string;
  @IsString()
  readonly addressTwo: string;
  @IsString()
  readonly city: string;
  @IsNumber()
  readonly state: number;
  @IsString()
  readonly zipCode: string;
  @IsString()
  readonly billingAddressOne: string;
  @IsString()
  readonly billingAddressTwo: string;
  @IsString()
  readonly billingCity: string;
  @IsNumber()
  readonly billingState: number;
  @IsString()
  readonly billingZipCode: string;
  @IsString()
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsEmail()
  readonly billingEmail: string;
  @IsString()
  readonly phone: string;
  @IsString()
  readonly billingPhone: string;
  @IsNumber()
  readonly accType: number;
  @IsString()
  readonly qbAccountNumber: string;
  @IsString()
  readonly brandColor: string;
  @IsBase64()
  readonly logo: string;
  @IsBoolean()
  readonly whiteLabel: boolean;
  @IsNumber()
  readonly status: number;
  @IsString()
  readonly closedDate: string;
}
