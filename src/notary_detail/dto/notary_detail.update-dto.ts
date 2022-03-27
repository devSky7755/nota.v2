import { PartialType } from "@nestjs/mapped-types";
import { CreateNotaryDetailDto } from "./notary_detail.create-dto";

export class UpdateNotaryDetailDto extends PartialType(CreateNotaryDetailDto) { }
