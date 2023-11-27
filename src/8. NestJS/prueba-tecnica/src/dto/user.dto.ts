import { Optional } from "@nestjs/common";
import { Exclude, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

class UserDTO {

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  readonly id: number;

  @Optional()
  @Type(() => String)
  name: string;
}

export { UserDTO }