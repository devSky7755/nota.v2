import { IsString, IsBoolean } from "class-validator";

export class CreateMethodDto {
  @IsString()
  readonly name: string;
  @IsBoolean()
  readonly status: boolean;
}
