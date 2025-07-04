import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  @Max(15)
  limit: number;


  @IsInt()
  @Type(() => Number)
  @Min(0)
  offset: number;

  constructor(limit, offset) {

    this.limit = limit

    this.offset = offset
  }
}