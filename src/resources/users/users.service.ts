import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
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

  async remove(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
   async ensureSuperAdminExists() {
    const superAdminExists = await this.userModel.findOne({ role: 'SUPER_ADMIN' }).exec();
    if (!superAdminExists) {
      const superAdminData: CreateUserDto = {
        firstname: 'Super',
        lastname: 'Admin',
        email: 'superadmin@example.com', // Use real email and secure password
        password: 'securePassword', // Make sure to hash this password
        roles: ['SUPER_ADMIN'],
      };
      // Hash password (assuming create method does this)
      //await this.create(superAdminData);
      console.log('Super Admin user created');
    }
  }

}
