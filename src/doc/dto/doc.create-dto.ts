import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";

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

  @IsBoolean()
  readonly needsNotary: boolean;

  @IsNumber()
  readonly clientId: number;

  @IsNumber()
  readonly sessionId: number;
}
