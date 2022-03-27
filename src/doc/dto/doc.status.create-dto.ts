import { IsBoolean, IsString } from "class-validator";

export class CreateDocStatusDto {
  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly status: boolean;
}
