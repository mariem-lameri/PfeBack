import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
 
  findByEmail(email: any) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel("User") private readonly userModel: Model<User>) {}
  

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto,);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!existingUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return existingUser;
  }

  async delete(userId: string): Promise<void> {
    try {
      // Find the user by ID and delete it
      const result = await this.userModel.deleteOne({ id: userId }).exec();
      
      // Check if a user was deleted
      if (result.deletedCount === 0) {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      // Handle any errors that occur during deletion
      throw new Error('Failed to delete user');
    }
  }
  
  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async findOneByRole(role: string): Promise<User> {
    const user = await this.userModel.findOne({ role }).exec();
    if (!user) null
    return user;
  }

} 
