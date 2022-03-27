import { IsString, IsBoolean } from "class-validator";

export class CreateTypeDto {
  @IsString()
  readonly name: string;
  @IsBoolean()
  readonly status: boolean;
}
