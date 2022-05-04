import { IsString, IsBoolean } from "class-validator";

export class CreateSessionStatusDto {
  @IsString()
  readonly name: string;
  @IsBoolean()
  readonly status: boolean;
}
