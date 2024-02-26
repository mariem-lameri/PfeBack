import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TicketSchema } from './entities/ticket.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Ticket', schema: TicketSchema }])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}

