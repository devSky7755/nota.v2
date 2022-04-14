import { IsString, IsJSON, IsNumber, IsBoolean } from "class-validator";

export class CreateTimeZoneDto {
  @IsString()
  readonly value: string;
  @IsString()
  readonly abbr: string;
  @IsNumber()
  readonly offset: number;
  @IsBoolean()
  readonly isdst: boolean;
  @IsString()
  readonly text: string;
  @IsJSON()
  readonly utc: string[];
}
