import { PartialType } from "@nestjs/mapped-types";
import { CreateDocStatusDto } from "./doc.status.create-dto";


export class UpdateDocStatusDto extends PartialType(CreateDocStatusDto) { }