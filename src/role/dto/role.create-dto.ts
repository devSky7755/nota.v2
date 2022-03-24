import { IsString, IsBoolean } from "class-validator";
import { UniqueOnDatabase } from "src/providers/unique-validation";
import { RoleEntity } from "../entity/role.entity";

export class CreateRoleDto {
  @IsString()
  @UniqueOnDatabase(RoleEntity)
  readonly name: string;

  @IsBoolean()
  readonly status: boolean;
}
