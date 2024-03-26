import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
// @UseGuards(RolesGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  //@Roles(Role.Admin)
  @ApiOperation({ summary: 'Crée un nouveau projet' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth()
  async create(@Body() createProjectDto: CreateProjectDto) {
    const createdProject = await this.projectsService.create(createProjectDto);
    return await this.projectsService.findOne(createdProject.id.toString());
  }

  @Get()
  @ApiOperation({ summary: 'Récupère tous les projets' })
  @ApiResponse({ status: 200, description: 'Ok.' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère un projet par son ID' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'mise à jour du projet' })
  @ApiResponse({ status: 200, description: 'Updated.' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  // @Roles(Role.Admin)
  @ApiOperation({ summary: 'suppression du projet par id' })
  @ApiResponse({ status: 200, description: 'Deleted.' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
