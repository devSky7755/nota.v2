import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateAssociateDto {
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
  readonly phone: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly dob: string;
  @IsNumber()
  readonly tz: number;
}
