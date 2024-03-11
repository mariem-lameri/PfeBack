
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/resources/users/entities/user.entity';


@Schema()
export class Project extends Document {
  @ApiProperty({ type: String })
  _id: mongoose.Types.ObjectId;

  @ApiProperty({ })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ type: [String], description: 'Liste des membres du projet' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  members: User[]; 

  @ApiProperty({ type: String, description: 'Identifiant du client associé au projet', required: false })
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false })
  clientId: mongoose.Types.ObjectId; 
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
