import { PartialType } from "@nestjs/mapped-types";
import { CreateDocActionDto } from "./doc.action.create-dto";

export class UpdateDocActionDto extends PartialType(CreateDocActionDto) { }