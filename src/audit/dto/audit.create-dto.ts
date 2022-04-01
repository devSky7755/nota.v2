import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAuditDto {
  @IsString()
  readonly accountId: number;
  @IsString()
  readonly path: string;
  @IsNumber()
  readonly pathId!: number | null;
  @IsString()
  readonly action: string;
}
