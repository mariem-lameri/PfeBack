import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty  } from "class-validator";

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty() 
  name: string;

  @ApiProperty()
  @IsNotEmpty() 
  description: string;

  @ApiProperty()
  @IsNotEmpty() 
  permission: string;


}