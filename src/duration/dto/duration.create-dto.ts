import { IsNumber, IsBoolean } from "class-validator";

export class CreateDurationDto {
  @IsNumber()
  readonly time: number;
  @IsBoolean()
  readonly status: boolean;
}
