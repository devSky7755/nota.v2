import { IsString, IsNumber, IsBoolean, IsBase64 } from "class-validator";

export class CreateNotaryDetailDto {
  @IsString()
  readonly comName: string;
  @IsString()
  readonly notaryDob: string;
  @IsString()
  readonly comNum: string;
  @IsNumber()
  readonly comState: number;
  @IsString()
  readonly comDate: string;
  @IsString()
  readonly comExp: string;
  @IsBoolean()
  readonly comStatus: boolean;
  @IsString()
  readonly onComNum: string;
  @IsString()
  readonly onComDate: string;
  @IsString()
  readonly onComExp: string;
  @IsBoolean()
  readonly onComStatus: boolean;
  @IsString()
  readonly comCounty: string;
  @IsBase64()
  readonly sig: string;
  @IsBase64()
  readonly stamp: string;
  @IsBase64()
  readonly notaryCert: string;
  @IsBase64()
  readonly onNotaryCert: string;
}
