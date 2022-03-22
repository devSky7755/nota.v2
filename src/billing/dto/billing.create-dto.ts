import { IsBase64, IsString, IsNumber, IsArray } from "class-validator";

export class CreateBillingDto {
  @IsString()
  readonly qbInvoiceId: string;
  @IsNumber()
  readonly amountDue: number;
  @IsNumber()
  readonly balance: number;
  @IsNumber()
  readonly amountPayed: number;
  @IsString()
  readonly dueDate: string;
  @IsNumber()
  readonly accountId: number;
  @IsNumber()
  readonly netAccountId: number;
  @IsNumber()
  readonly status: number;
  @IsArray()
  readonly items: Array<number>;
  @IsArray()
  readonly payments: Array<number>;
}
