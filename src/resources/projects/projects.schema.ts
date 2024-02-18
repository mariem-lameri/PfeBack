import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  clientName: { type: String, required: true }, 
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// create-project.dto.ts
import { IsString, IsNotEmpty, IsArray, ArrayUnique } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly clientName: string; // Champ clientName

  @IsArray()
  @ArrayUnique()
  readonly teamMembers: string[]; // IDs des utilisateurs
}
