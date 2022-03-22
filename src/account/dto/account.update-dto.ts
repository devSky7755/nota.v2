import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsOptional, IsString } from "class-validator";
import { CreateAccountDto } from "./account.create-dto";

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
    @IsOptional()
    @IsString()
    @IsEmail()
    readonly email: string;
}
