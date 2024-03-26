
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/resources/users/entities/user.entity';


@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Project extends Document {
  @ApiProperty({ type: String })
  @Prop({ required: true })
  projectId: mongoose.Types.ObjectId;

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

export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);


// Add a virtual field that exposes `_id` as `id`
ProjectSchema.virtual('documentId').get(function () {
  return this._id.toHexString();
});

// Customize the toJSON method to include virtuals
ProjectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toHexString();
    delete ret._id;
  },
});
