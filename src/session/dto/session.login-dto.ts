import { IsString, IsBoolean, IsNumber, IsArray, IsOptional } from "class-validator";

export class LoginSessionDto {
    @IsString()
    readonly pin: string;
}
