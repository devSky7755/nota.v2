import { IsBase64, IsNumber, IsString } from "class-validator";

export class CreateWitnessDto {
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
  @IsString()
  readonly state: number;
  @IsString()
  readonly zipCode: string;
  @IsString()
  readonly phone: string;
  @IsBase64()
  readonly email: string;
  @IsString()
  readonly dob: string;
  @IsNumber()
  readonly tz: number;
}
