import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity'; 

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('Project') private readonly projectModel: Model<Project>) {}

  
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = new this.projectModel(createProjectDto);
    return await newProject.save();
  }


  async findAll(): Promise<Project[]> {
    return await this.projectModel.find().populate('teamMembers').exec();
  }

  
  async findOne(id: string): Promise<Project> {
    return await this.projectModel.findById(id).populate('teamMembers').exec();
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    return await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Project> {
    return await this.projectModel.findByIdAndDelete(id).exec();
  }
}
