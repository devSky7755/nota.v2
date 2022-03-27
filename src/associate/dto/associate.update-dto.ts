import { PartialType } from "@nestjs/mapped-types";
import { CreateAssociateDto } from "./associate.create-dto";

export class UpdateAssociateDto extends PartialType(CreateAssociateDto) { }
