import { IsString, IsBoolean } from "class-validator";

export class CreateAccTypeDto {
  @IsString()
  readonly name: string;
  @IsBoolean()
  readonly status: boolean;
}
