import { PartialType } from "@nestjs/mapped-types";
import { CreateWitnessDto } from "./witness.create-dto";

export class UpdateWitnessDto extends PartialType(CreateWitnessDto) { }
