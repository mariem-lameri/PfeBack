// CreateTicketDto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: ['DONE', 'TO_DO', 'IN_PROGRESS'] })
  @IsEnum(['DONE', 'TO_DO', 'IN_PROGRESS'])
  status: string;

  @ApiProperty({ enum: ['LOW', 'MEDIUM', 'HIGH'] })
  @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
  priority: string;

  @ApiProperty()
  @IsMongoId()
  assignedTo: string;

  @ApiProperty()
  @IsMongoId()
  createdBy: string;
}

import { PartialType } from '@nestjs/swagger';
export class UpdateTicketDto extends PartialType(CreateTicketDto) {}
