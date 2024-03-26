import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserStoryDto } from './dto/create-userstory.dto';
import { UpdateUserStoryDto } from './dto/update-userstory.dto';
import { UserStory } from './entities/userstory.entity';
import { Project } from 'src/resources/projects/entities/project.entity';

@Injectable()
export class UserStoriesService {
  constructor(
    @InjectModel(UserStory.name) private userStoryModel: Model<UserStory>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(projectId: string, createUserStoryDto: CreateUserStoryDto): Promise<UserStory> {
    const project = await this.projectModel.findById(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID "${projectId}" not found`);
    }
    
    const createdUserStory = new this.userStoryModel({
      ...createUserStoryDto,
      project: projectId,
    });
    return createdUserStory.save();
  }

  async findAll(projectId: string): Promise<UserStory[]> {
    return this.userStoryModel.find({ project: projectId }).exec();
  }

  async findOne(projectId: string, id: string): Promise<UserStory> {
    const userStory = await this.userStoryModel.findOne({ _id: id, project: projectId }).exec();
    if (!userStory) {
      throw new NotFoundException(`User story with ID "${id}" not found`);
    }
    return userStory;
  }

  async update(projectId: string, id: string, updateUserStoryDto: UpdateUserStoryDto): Promise<UserStory> {
    const updatedUserStory = await this.userStoryModel.findOneAndUpdate({ _id: id, project: projectId }, { $set: updateUserStoryDto }, { new: true }).exec();
    if (!updatedUserStory) {
      throw new NotFoundException(`User story with ID "${id}" not found`);
    }
    return updatedUserStory;
  }

  async remove(projectId: string, id: string): Promise<void> {
    const result = await this.userStoryModel.deleteOne({ _id: id, project: projectId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User story with ID "${id}" not found`);
    }
  }
}

