import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/resources/users/entities/user.entity';

enum TicketStatus {
  ToDo = 'to do',
  InProgress = 'in progress',
  Done = 'done',
}

enum TicketPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

@Schema()
export class Ticket extends Document {
  @ApiProperty({ type: String })
  id: mongoose.Types.ObjectId;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ type: String })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ enum: TicketStatus, description: 'Statut actuel du ticket' })
  @Prop({ required: true, enum: TicketStatus })
  status: TicketStatus;

  @ApiProperty({ enum: TicketPriority, description: 'Priorité du ticket' })
  @Prop({ required: true, enum: TicketPriority })
  priority: TicketPriority;

  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'Utilisateur assigné au ticket',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  assignedTo: User | mongoose.Types.ObjectId;

  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'Créateur du ticket',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User | mongoose.Types.ObjectId;

  @ApiProperty({ type: Date, description: 'Date de création du ticket' })
  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
