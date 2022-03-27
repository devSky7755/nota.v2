import { PartialType } from "@nestjs/mapped-types";
import { CreateTypeDto } from "./type.create-dto";

export class UpdateTypeDto extends PartialType(CreateTypeDto) { }
