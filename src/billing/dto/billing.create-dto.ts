import { IsString, IsNumber, IsArray, IsBoolean, IsDate, IsDateString } from "class-validator";

export class CreateBillingItemDto {
  @IsString()
  readonly name: string;
  @IsString()
  description: string;
  @IsNumber()
  qty: number;
  @IsNumber()
  amount: number;
  @IsNumber()
  discount: number;
  @IsBoolean()
  taxable: boolean;
}

export class CreateBillingPaymentDto {
  @IsNumber()
  amount: number;
  @IsString()
  qbPaymentId: string;
  @IsString()
  paymentDate: string;
  @IsNumber()
  statusId: number;
}

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
  readonly items: Array<CreateBillingItemDto>;
  @IsArray()
  readonly payments: Array<CreateBillingPaymentDto>;
}
