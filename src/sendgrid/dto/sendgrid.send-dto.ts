import { IsEmail, IsOptional, IsString } from "class-validator";

export class SGEmailSendDto {
  @IsEmail()
  readonly to: string;
  @IsOptional()
  @IsString()
  readonly subject: string;
  @IsString()
  readonly text: string;
  @IsString()
  readonly html: string;
}
