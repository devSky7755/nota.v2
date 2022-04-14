import { IsString, IsBoolean, IsArray, IsOptional, IsNumber } from "class-validator";
import { CreateNotaryDetailDto } from "src/notary_detail/dto/notary_detail.create-dto";
import { UniqueOnDatabase } from "src/providers/unique-validation";
import { UserEntity } from "../entity/user.entity";

export class CreateUserDetailDto {
  @IsString()
  readonly addressOne: string;
  @IsString()
  readonly addressTwo: string;
  @IsString()
  readonly city: string;
  @IsNumber()
  readonly state: number;
  @IsString()
  readonly zipCode: string;
}

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
  @IsNumber()
  readonly tz: number;
  @IsArray()
  readonly userDetails: Array<CreateUserDetailDto>;
  @IsBoolean()
  readonly isNotary: boolean;
  @IsOptional()
  @IsArray()
  readonly notaryDetails: Array<CreateNotaryDetailDto>;
  @IsString()
  readonly signature: string;
  @IsOptional()
  @IsArray()
  readonly accIds: Array<number>;
}
