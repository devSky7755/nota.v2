import { IsBase64, IsString, IsBoolean, IsNumber } from "class-validator";

export class CreateRecordDto {
  @IsString()
  readonly uuid: string;
  @IsString()
  readonly notary_date: string;
  @IsString()
  readonly notary_county: string;
  @IsString()
  readonly doc_date: string;
  @IsString()
  readonly doc_title: string;
  @IsString()
  readonly principle_name: string;
  @IsString()
  readonly principle_address: string;
  @IsString()
  readonly principle_phone: string;
  @IsBase64()
  readonly principle_sig: string;
  @IsString()
  readonly witness_name: string;
  @IsString()
  readonly witness_address: string;
  @IsString()
  readonly dl_num: string;
  @IsString()
  readonly dl_exp: string;
  @IsBase64()
  readonly dl_img: string;
  @IsNumber()
  readonly fee: number;
  @IsBoolean()
  readonly is_online: boolean;
}
