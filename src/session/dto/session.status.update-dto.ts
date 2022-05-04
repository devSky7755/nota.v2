import { PartialType } from "@nestjs/mapped-types";
import { CreateSessionStatusDto } from "./session.status.create-dto";

export class UpdateSessionStatusDto extends PartialType(CreateSessionStatusDto) { }
