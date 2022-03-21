import { IsBase64, IsString, IsNumber } from "class-validator";

export class CreateBillingDto {
  @IsString()
  readonly accountId: string;
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
}
