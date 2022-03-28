import { PartialType } from "@nestjs/mapped-types";
import { CreateDurationDto } from "./duration.create-dto";

export class UpdateDurationDto extends PartialType(CreateDurationDto) { }
