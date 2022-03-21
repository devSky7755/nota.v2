import { IsString, IsBoolean } from "class-validator";

export class CreateUserDto {
  @IsString()
  readonly email: string;
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @IsString()
  readonly phone: string;
  @IsString()
  readonly password: string;
  @IsBoolean()
  readonly status: boolean;
  @IsBoolean()
  readonly isNotary: boolean;
  @IsString()
  readonly signature: string;
}
