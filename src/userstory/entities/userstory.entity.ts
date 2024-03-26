import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { Project } from 'src/resources/projects/entities/project.entity';


@Schema()
export class UserStory extends Document {
  @ApiProperty({ type: String })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  priority: string;

  @ApiProperty({ type: String, required: false })
  @Prop()
  status?: string;

  @ApiProperty({ type: String })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  projectId: Project;
}

export const UserStorySchema = SchemaFactory.createForClass(UserStory);
