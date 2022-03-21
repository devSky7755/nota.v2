import { IsBase64, IsString } from "class-validator";

export class CreateAuditDto {
  @IsString()
  readonly accountId: number;
  @IsString()
  readonly uuid: string;
  @IsString()
  readonly path: string;
  @IsString()
  readonly pathId: number;
  @IsString()
  readonly action: string;
  @IsString()
  readonly createdAt: string;
}
