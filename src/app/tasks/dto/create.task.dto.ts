import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly name: string;
  readonly description: string;
  readonly enable: boolean;


  constructor(description, enable, name) {
    this.description = description
    this.enable = enable
    this.name = name;
  }
}