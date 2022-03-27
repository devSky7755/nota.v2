import { PartialType } from "@nestjs/mapped-types";
import { CreateMethodDto } from "./method.create-dto";

export class UpdateMethodDto extends PartialType(CreateMethodDto) { }
