import { IsString, IsBoolean, IsNumber, IsArray, IsOptional } from "class-validator";
import { UniqueOnDatabase } from "src/providers/unique-validation";
import { SessionEntity } from "../entity/session.entity";

export class CreateSessionDto {
  @IsNumber()
  readonly account: number;
  @IsNumber()
  readonly user: number;
  @IsString()
  readonly dateTime: string;
  @IsNumber()
  readonly duration: number;
  @IsNumber()
  readonly docsNum: number;
  @IsNumber()
  readonly sessionType: number;
  @IsNumber()
  readonly sessionStatus: number;
  @IsNumber()
  readonly notarySessionType: number;
  @IsString()
  readonly caseMatterNum: string;
  @IsString()
  readonly videoUrl: string;
  @IsArray()
  readonly clientIds: Array<number>;
  @IsArray()
  readonly witnessIds: Array<number>;
  @IsOptional()
  @IsArray()
  readonly associateIds: Array<number>;
  @IsOptional()
  @IsArray()
  readonly assocUserIds: Array<number>;
  @IsArray()
  readonly docIds: Array<number>;
}
