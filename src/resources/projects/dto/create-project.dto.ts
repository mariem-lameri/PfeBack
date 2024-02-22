import { ApiProperty } from "@nestjs/swagger";

import { IsString, IsNotEmpty, IsArray, ArrayUnique } from 'class-validator';

export class CreateProjectDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string;

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
  clientId: string; 
 
  @ApiProperty()
  @IsArray()
  @ArrayUnique()
  members: string[]; 
}
