import { IsString } from "class-validator";

export class CreateDocDto {
  @IsString()
  readonly docTitle: string;

  @IsString()
  readonly docDate: string;

  @IsString()
  readonly docType: string;

  @IsString()
  readonly docUrl: string;

  @IsString()
  readonly destroyDate: string;
}
