
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';


@Schema()
export class Role {

  @ApiProperty()
  id: mongoose.Types.ObjectId;
  

  @ApiProperty()
  @Prop({ required: true, unique: true })
  name: string;


  @ApiProperty()
  @Prop()
  description: string;


  @ApiProperty()
  @Prop([String])
  permissions: string[];
  static Admin: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
export type RoleDocument = Role & Document;