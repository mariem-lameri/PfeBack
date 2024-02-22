import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

class MemberUpdateDto {
  @IsMongoId()
  readonly id: string;
}

export class UpdateProjectDto {
  @ApiPropertyOptional({ description: 'Nom du projet' })
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({ description: 'Description du projet' })
  @IsString()
  readonly description?: string;

  @ApiPropertyOptional({ description: 'Identifiant du client associé au projet', type: String })
  @IsMongoId()
  readonly clientId?: string;

  @ApiPropertyOptional({ description: 'Liste des identifiants des membres du projet', type: [String] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MemberUpdateDto)
  readonly members?: MemberUpdateDto[];
}
