import { PartialType } from "@nestjs/mapped-types";
import { CreateAccountDto } from "./account.create-dto";

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
