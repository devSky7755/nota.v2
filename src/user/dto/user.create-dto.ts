import { IsString, IsBoolean, IsArray, IsOptional } from "class-validator";
import { UniqueOnDatabase } from "src/providers/unique-validation";
import { UserEntity } from "../entity/user.entity";

export class CreateUserDto {
  @IsString()
  @UniqueOnDatabase(UserEntity)
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
  @IsOptional()
  @IsArray()
  readonly accIds: Array<number>;
}
