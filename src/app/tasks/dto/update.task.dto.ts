import { PartialType } from "@nestjs/swagger";
import { CreateTaskDto } from "./create.task.dto";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  // readonly description?: string;
  // readonly enable?: boolean;
}