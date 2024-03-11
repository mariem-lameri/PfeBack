import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel('Ticket') private readonly ticketModel: Model<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const newTicket = new this.ticketModel(createTicketDto);
    return newTicket.save();
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findById(id).lean().exec();
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID "${id}" not found`);
    }
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const updatedTicket = await this.ticketModel
      .findByIdAndUpdate(id, updateTicketDto, { new: true })
      .lean()
      .exec();
    if (!updatedTicket) {
      throw new NotFoundException(`Ticket with ID "${id}" not found`);
    }
    return updatedTicket;
  }

  async remove(id: string): Promise<void> {
    const result = await this.ticketModel.deleteOne({ _id: id }).lean().exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Ticket with ID "${id}" not found`);
    }
  }
}
