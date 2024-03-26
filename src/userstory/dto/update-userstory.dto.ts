import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsArray, ArrayUnique } from 'class-validator';
import { CreateUserStoryDto, Priority } from './create-userstory.dto';

export class UpdateUserStoryDto extends PartialType(CreateUserStoryDto) {
  @ApiProperty({ description: 'Title of the user story', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Detailed description of the user story', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Priority of the user story', enum: Priority, required: false })
  @IsEnum(Priority)
  @IsNotEmpty()
  @IsOptional()
  priority?: Priority;

  @ApiProperty({ description: 'Status of the user story', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  // If you want to optionally update the project ID associated with the user story
  @ApiProperty({ description: 'ID of the project this story belongs to', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  projectId?: string;

  // Example for updating members array, if applicable
  @ApiProperty({ description: 'Members associated with the user story', required: false, type: [String] })
  @IsArray()
  @ArrayUnique()
  @IsOptional()
  members?: string[];
}
