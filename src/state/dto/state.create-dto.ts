import { IsString, IsBoolean } from "class-validator";
import { UniqueOnDatabase } from "src/providers/unique-validation";
import { StateEntity } from "../entity/state.entity";

export class CreateStateDto {
  @IsString()
  @UniqueOnDatabase(StateEntity)
  readonly state: string;

  @IsString()
  @UniqueOnDatabase(StateEntity)
  readonly abbr: string;

  @IsBoolean()
  readonly status: boolean;
}
