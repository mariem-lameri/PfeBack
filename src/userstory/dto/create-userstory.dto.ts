import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export class CreateUserStoryDto {
  @ApiProperty({ description: 'Title of the user story' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Detailed description of the user story' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Priority of the user story', enum: Priority })
  @IsEnum(Priority)
  @IsNotEmpty()
  priority: Priority;

  // If user stories are associated with a specific project ID
  @ApiProperty({ description: 'ID of the project this story belongs to' })
  @IsString()
  @IsNotEmpty()
  projectId: string;

  // Optional fields like status, etc. can also be added with appropriate validation
  @ApiProperty({ description: 'Status of the user story', required: false })
  @IsString()
  @IsOptional()
  status?: string;
  
  // Other fields as necessary
}
