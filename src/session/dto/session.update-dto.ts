import { PartialType } from "@nestjs/mapped-types";
import { CreateSessionDto } from "./session.create-dto";

export class UpdateSessionDto extends PartialType(CreateSessionDto) { }
