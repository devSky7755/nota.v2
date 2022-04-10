import { IsNumber, IsString } from "class-validator";

export class CreateDocDto {
  @IsString()
  readonly docTitle: string;

  @IsString()
  readonly docDate: string;

  @IsString()
  readonly destroyDate: string;

  @IsString()
  readonly action: number;

  @IsString()
  readonly status: number;
}
