import { IsString, IsBoolean } from "class-validator";

export class CreateDurationDto {
  @IsString()
  readonly name: string;
  @IsBoolean()
  readonly status: boolean;
}
