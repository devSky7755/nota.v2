import { PartialType } from "@nestjs/mapped-types";
import { CreateRecordDto } from "./record.create-dto";

export class UpdateRecordDto extends PartialType(CreateRecordDto) { }
