import { ApiProperty } from "@nestjs/swagger";

import { IsString, IsNotEmpty, IsArray, ArrayUnique } from 'class-validator';

export class CreateProjectDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
 clientName: string; 
 
  @ApiProperty()
  @IsArray()
  @ArrayUnique()
  teamMembers: string[]; 
}
