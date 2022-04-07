import { IsString } from "class-validator";

export class SmsSendDto {
  @IsString()
  readonly to: string;
  @IsString()
  readonly body: string;
}
