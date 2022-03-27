import { IsBoolean, IsString } from "class-validator";

export class CreateDocActionDto {
  @IsString()
  readonly name: string;

  @IsBoolean()
  readonly status: boolean;
}
