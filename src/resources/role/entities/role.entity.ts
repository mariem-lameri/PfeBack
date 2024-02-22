
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';


@Schema()
export class Role {

  @ApiProperty()
  _id: mongoose.Types.ObjectId;
  

  @ApiProperty()
  @Prop({ required: true, unique: true })
  name: string;


  @ApiProperty()
  @Prop()
  description: string;


  @ApiProperty()
  @Prop([String])
  permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
export type RoleDocument = Role & Document;