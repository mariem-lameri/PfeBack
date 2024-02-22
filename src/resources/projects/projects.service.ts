import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './entities/project.entity';
import { CreateProjectDto} from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  deleteByName: any;
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = new this.projectModel(createProjectDto);
    return await newProject.save();
  }

  async findAll(): Promise<Project[]> {
    return await this.projectModel.find().populate('members').exec();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).populate('members').exec();
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const updatedProject = await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true }).populate('members').exec();
    if (!updatedProject) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return updatedProject;
  }

  async remove(id: string): Promise<void> {
    const result = await this.projectModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
  }
  async removeByName(name: string): Promise<any> {
    const result = await this.projectModel.deleteOne({ name:name }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Project with name "${name}" not found`);
    }
    return result;
  }
}
