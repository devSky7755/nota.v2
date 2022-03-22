import { PartialType } from "@nestjs/mapped-types";
import { CreateBillingDto } from "./billing.create-dto";

export class UpdateBillingDto extends PartialType(CreateBillingDto) { }
