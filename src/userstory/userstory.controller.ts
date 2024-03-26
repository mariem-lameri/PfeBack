import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserStoryDto } from './dto/create-userstory.dto';
import { UpdateUserStoryDto } from './dto/update-userstory.dto';
import { UserStory } from './entities/userstory.entity';
import { UserStoriesService } from './userstory.service';
//import { UserStoriesService } from './user-stories.service'; // Ensure correct import path
//import { UserStory } from './schemas/userstory.schema'; // Ensure correct import path

@ApiTags('user-stories')
@Controller('projects/:projectId/user-stories')
export class UserStoriesController {
  constructor(private readonly userStoriesService: UserStoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user story for a project' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @UseGuards(JwtAuthGuard) Uncomment if using JWT authentication
  // @ApiBearerAuth()
  async create(
    @Param('projectId') projectId: string,
    @Body() createUserStoryDto: CreateUserStoryDto,
  ): Promise<UserStory> {
    return this.userStoriesService.create(projectId, createUserStoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user stories for a project' })
  async findAll(@Param('projectId') projectId: string): Promise<UserStory[]> {
    return this.userStoriesService.findAll(projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user story by ID' })
  async findOne(@Param('projectId') projectId: string, @Param('id') id: string): Promise<UserStory> {
    return this.userStoriesService.findOne(projectId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user story' })
  async update(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @Body() updateDto: UpdateUserStoryDto,
  ): Promise<UserStory> {
    return this.userStoriesService.update(projectId, id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user story' })
  async remove(@Param('projectId') projectId: string, @Param('id') id: string): Promise<void> {
    return this.userStoriesService.remove(projectId, id);
  }
}
