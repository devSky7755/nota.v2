import { IsString, IsJSON, IsNumber } from "class-validator";
import { PossibleAnswer } from "../entity/kba.entity";

export class CreateKbaDto {
  @IsNumber()
  readonly client: number;
  @IsString()
  readonly question: string;
  @IsJSON()
  readonly possibleAnswers: PossibleAnswer[];
  @IsString()
  readonly correctAnswer: string;
}
