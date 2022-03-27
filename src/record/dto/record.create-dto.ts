import { IsBase64, IsString, IsBoolean, IsNumber } from "class-validator";

export class CreateRecordDto {
  @IsString()
  readonly uuid: string;
  @IsString()
  readonly notaryDate: string;
  @IsString()
  readonly notaryCounty: string;
  @IsString()
  readonly docDate: string;
  @IsString()
  readonly docTitle: string;
  @IsString()
  readonly principleName: string;
  @IsString()
  readonly principleAddress: string;
  @IsString()
  readonly principlePhone: string;
  @IsBase64()
  readonly principleSig: string;
  @IsString()
  readonly witnessName: string;
  @IsString()
  readonly witnessAddress: string;
  @IsNumber()
  readonly typeOfNotarization: number;
  @IsNumber()
  readonly methodOfId: number;
  @IsString()
  readonly dlNum: string;
  @IsString()
  readonly dlExp: string;
  @IsNumber()
  readonly dlState: number;
  @IsBase64()
  readonly dlImg: string;
  @IsNumber()
  readonly fee: number;
  @IsBoolean()
  readonly isOnline: boolean;
}
