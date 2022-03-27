import { IsArray, IsBase64, IsBoolean, IsOptional, IsString } from "class-validator";

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
  @IsString()
  readonly state: number;
  @IsBase64()
  readonly zipCode: string;
  @IsString()
  readonly billingAddressOne: string;
  @IsString()
  readonly billingAddressTwo: string;
  @IsString()
  readonly billingCity: string;
  @IsString()
  readonly billingState: number;
  @IsBase64()
  readonly billingZipcode: string;
  @IsString()
  readonly phone: string;
  @IsString()
  readonly email: string;
  @IsBoolean()
  readonly sendSms: boolean;
  @IsString()
  readonly sendEmail: boolean;
  @IsString()
  readonly dob: string;
  @IsString()
  readonly ssn: string;
  @IsString()
  readonly dlNum: string;
  @IsString()
  readonly dlState: number;
  @IsString()
  readonly dlExp: string;
  @IsString()
  readonly dlImage: string;
  @IsString()
  readonly signature: string;
  @IsOptional()
  @IsArray()
  readonly accIds: Array<number>;
  @IsOptional()
  @IsArray()
  readonly kbas: Array<any>;
}
