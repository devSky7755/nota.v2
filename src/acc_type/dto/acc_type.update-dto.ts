import { PartialType } from "@nestjs/mapped-types";
import { CreateAccTypeDto } from "./acc_type.create-dto";

export class UpdateAccTypeDto extends PartialType(CreateAccTypeDto) { }
