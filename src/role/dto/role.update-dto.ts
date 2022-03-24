import { IsString, IsBoolean, IsOptional } from "class-validator";
import { UniqueOnDatabase } from "src/providers/unique-validation";
import { RoleEntity } from "../entity/role.entity";

export class UpdateRoleDto {
    @IsOptional()
    @IsString()
    @UniqueOnDatabase(RoleEntity)
    readonly name: string;

    @IsOptional()
    @IsBoolean()
    readonly status: boolean;
}