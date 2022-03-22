import { IsString, IsBoolean, IsOptional } from "class-validator";
import { UniqueOnDatabase } from "src/providers/unique-validation";
import { StateEntity } from "../entity/state.entity";

export class UpdateStateDto {
    @IsOptional()
    @IsString()
    @UniqueOnDatabase(StateEntity)
    readonly state: string;

    @IsOptional()
    @IsString()
    @UniqueOnDatabase(StateEntity)
    readonly abbr: string;

    @IsOptional()
    @IsBoolean()
    readonly status: boolean;
}
