import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity'; 

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole = new this.roleModel(createRoleDto);
    return await newRole.save();
  }

  async findAll(): Promise<Role[]> {
    return await this.roleModel.find().exec();
  }

  async findOne(id: string): Promise<Role | null> {
    const role = await this.roleModel.findById(id).exec();
    return role || null;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role | null> {
    const existingRole = await this.roleModel.findByIdAndUpdate(id, updateRoleDto, { new: true }).exec();
    return existingRole || null;
  }

  async delete(id: string): Promise<Role> {
    return await this.roleModel.deleteOne({ id: id }).lean();
  }
}

