
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async create(createRoleDto: any): Promise<Role> {
    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async update(id: string, updateRoleDto: any): Promise<Role> {
    return this.roleModel.findByIdAndUpdate(id, updateRoleDto, { new: true });
  }

  async delete(id: string): Promise<any> {
    return this.roleModel.findByIdAndDelete(id);
  }
}
