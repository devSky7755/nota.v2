import { PartialType } from "@nestjs/mapped-types";
import { CreateKbaDto } from "./kba.create-dto";

export class UpdateKbaDto extends PartialType(CreateKbaDto) { }
