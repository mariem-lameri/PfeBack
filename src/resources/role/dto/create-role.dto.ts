import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty  } from "class-validator";

export class CreateRoleDto {

@ApiProperty()
@IsNotEmpty()
_id: string;


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