import { PartialType } from "@nestjs/mapped-types";
import { CreateDocDto } from "./doc.create-dto";


export class UpdateDocDto extends PartialType(CreateDocDto) { }