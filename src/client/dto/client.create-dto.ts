import { IsArray, IsBase64, IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateClientDto {
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly middleName: string;
  @IsString()
  readonly lastName: string;
  @IsString()
  readonly suffix: string;
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
  readonly phone: string;
  @IsString()
  readonly email: string;
  @IsBoolean()
  readonly sendSms: boolean;
  @IsBoolean()
  readonly sendEmail: boolean;
  @IsString()
  readonly dob: string;
  @IsString()
  readonly ssn: string;
  @IsString()
  readonly dlNum: string;
  @IsNumber()
  readonly dlState: number;
  @IsString()
  readonly dlExp: string;
  @IsBase64()
  readonly dlImage: string;
  @IsBase64()
  readonly signature: string;
  @IsArray()
  readonly accIds: Array<number>;
  @IsArray()
  readonly kbas: Array<any>;
  @IsNumber()
  readonly tz: number;
}
