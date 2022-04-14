import { PartialType } from "@nestjs/mapped-types";
import { CreateTimeZoneDto } from "./timezone.create-dto";

export class UpdateKbaDto extends PartialType(CreateTimeZoneDto) { }
