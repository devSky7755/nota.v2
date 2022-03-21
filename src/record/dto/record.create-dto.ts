import { IsBase64, IsString } from "class-validator";

export class CreateRecordDto {
  @IsString()
  readonly uuid: string;
  @IsString()
  readonly notaryDate: string;
  @IsString()
  readonly notaryCountry: string;
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
  @IsString()
  readonly dlNum: string;
  @IsString()
  readonly dlExp: string;
  @IsBase64()
  readonly dlImg: string;
  @IsString()
  readonly dlFee: number;
  @IsString()
  readonly isOnline: boolean;
}
